import { afterEach, expect, test, vi } from 'vitest';
import { shopApi } from './shopApi';
import { createAppStore } from '../redux/store';

const user = { username: 'Test user', email: 'user@example.test', role: 'CLIENT' };
const credentials = { emailId: user.email, password: 'test-password' };
const token = { headerName: 'X-XSRF-TOKEN', token: 'masked-token' };

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json' },
});

afterEach(() => vi.unstubAllGlobals());

test('the first login sends the CSRF token, then verifies the session before storing the user', async () => {
  const fetch = vi.fn()
    .mockImplementationOnce(async () => json(token))
    .mockImplementationOnce(async () => json(user))
    .mockImplementationOnce(async () => json(user));
  vi.stubGlobal('fetch', fetch);
  const store = createAppStore();

  await expect(store.dispatch(shopApi.endpoints.login.initiate(credentials)).unwrap()).resolves.toEqual(user);

  const requests = fetch.mock.calls.map(([request]) => request);
  expect(requests.map((request) => [request.method, new URL(request.url).pathname])).toEqual([
    ['GET', '/csrf-token'], ['POST', '/auth/login'], ['GET', '/auth/verifyToken'],
  ]);
  expect(requests.every((request) => request.credentials === 'include')).toBe(true);
  expect(requests[0].cache).toBe('no-store');
  expect(requests[1].headers.get('X-XSRF-TOKEN')).toBe(token.token);
  expect(await requests[1].json()).toEqual(credentials);
  expect(requests[2].headers.has('X-XSRF-TOKEN')).toBe(false);
  expect(store.getState().auth.user).toEqual(user);
});

test('a failed bootstrap blocks the write and a later submission can try again', async () => {
  const fetch = vi.fn()
    .mockRejectedValueOnce(new Error('Gateway unavailable'))
    .mockImplementationOnce(async () => json(token))
    .mockImplementationOnce(async () => json(user))
    .mockImplementationOnce(async () => json(user));
  vi.stubGlobal('fetch', fetch);
  const store = createAppStore();

  await expect(store.dispatch(shopApi.endpoints.login.initiate(credentials)).unwrap())
    .rejects.toMatchObject({ status: 'CUSTOM_ERROR' });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(store.getState().auth.user).toBeNull();

  await expect(store.dispatch(shopApi.endpoints.login.initiate(credentials)).unwrap()).resolves.toEqual(user);
  expect(fetch.mock.calls.map(([request]) => new URL(request.url).pathname)).toEqual([
    '/csrf-token', '/csrf-token', '/auth/login', '/auth/verifyToken',
  ]);
});

test('a successful login response alone does not mark the UI as authenticated', async () => {
  vi.stubGlobal('fetch', vi.fn()
    .mockImplementationOnce(async () => json(token))
    .mockImplementationOnce(async () => json(user))
    .mockImplementationOnce(async () => json({ message: 'Missing cookie' }, 401)));
  const store = createAppStore();

  await expect(store.dispatch(shopApi.endpoints.login.initiate(credentials)).unwrap())
    .rejects.toMatchObject({ status: 'CUSTOM_ERROR' });
  expect(store.getState().auth.user).toBeNull();
});

test('concurrent writes share a bootstrap and accept Spring text responses', async () => {
  const fetch = vi.fn(async (request) => {
    if (new URL(request.url).pathname === '/csrf-token') return json(token);
    return new Response('Success', { headers: { 'Content-Type': 'text/plain' } });
  });
  vi.stubGlobal('fetch', fetch);
  const store = createAppStore();

  await expect(Promise.all([
    store.dispatch(shopApi.endpoints.forgotPassword.initiate(user.email)).unwrap(),
    store.dispatch(shopApi.endpoints.register.initiate(credentials)).unwrap(),
  ])).resolves.toEqual(['Success', 'Success']);
  expect(fetch.mock.calls.filter(([request]) => new URL(request.url).pathname === '/csrf-token')).toHaveLength(1);
  expect(fetch.mock.calls.slice(1).every(([request]) => request.headers.get('X-XSRF-TOKEN') === token.token)).toBe(true);
});
