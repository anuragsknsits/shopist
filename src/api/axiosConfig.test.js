import client from './axiosConfig';

const csrfResponse = { headerName: 'X-XSRF-TOKEN', token: 'masked-token' };

test('the first login waits for the gateway token and sends it in the header', async () => {
  const originalAdapter = client.defaults.adapter;
  const adapter = jest.fn(async config => ({
    config,
    data: config.url === '/csrf-token' ? csrfResponse : {},
  }));
  client.defaults.adapter = adapter;

  try {
    await client.post('/auth/login', { emailId: 'user@example.test', password: 'test' });

    expect(adapter.mock.calls.map(([config]) => config.url)).toEqual([
      '/csrf-token', '/auth/login',
    ]);
    const [tokenRequest] = adapter.mock.calls[0];
    const [loginRequest] = adapter.mock.calls[1];
    expect(tokenRequest.withCredentials).toBe(true);
    expect(loginRequest.withCredentials).toBe(true);
    expect(loginRequest.headers.get('X-XSRF-TOKEN')).toBe(csrfResponse.token);
  } finally {
    client.defaults.adapter = originalAdapter;
  }
});

test('a failed bootstrap prevents writes and the next submission can fetch a token', async () => {
  const originalAdapter = client.defaults.adapter;
  const adapter = jest.fn()
    .mockRejectedValueOnce(new Error('Gateway unavailable'))
    .mockImplementation(async config => ({
      config,
      data: config.url === '/csrf-token' ? csrfResponse : {},
    }));
  client.defaults.adapter = adapter;

  try {
    await expect(client.post('/auth/login')).rejects.toThrow('Gateway unavailable');
    expect(adapter.mock.calls.map(([config]) => config.url)).toEqual(['/csrf-token']);

    await client.post('/auth/login');
    expect(adapter.mock.calls.map(([config]) => config.url)).toEqual([
      '/csrf-token', '/csrf-token', '/auth/login',
    ]);
  } finally {
    client.defaults.adapter = originalAdapter;
  }
});

test('rejects requests outside the gateway origin', async () => {
  await expect(client.post('https://other.example.test/submit'))
    .rejects.toThrow('API requests must use the configured gateway origin.');
});
