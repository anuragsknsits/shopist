import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';
import App from './App';
import { shopApi } from './api/shopApi';
import { createAppStore } from './redux/store';

afterEach(() => vi.unstubAllGlobals());

function renderApp(store, path) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

test('renders the Shopist home page', async () => {
  renderApp(createAppStore(), '/');
  expect(await screen.findByRole('heading', { name: 'Your Trusted Chartered Accountants' })).toBeInTheDocument();
});

test('a protected route waits for session verification before redirecting a guest', async () => {
  let finishSessionCheck;
  vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => { finishSessionCheck = resolve; })));
  const store = createAppStore();
  store.dispatch(shopApi.endpoints.session.initiate(undefined, { subscribe: false }));
  renderApp(store, '/profile');

  expect(screen.getByRole('status')).toHaveTextContent('Checking your session');
  await vi.waitFor(() => expect(finishSessionCheck).toBeTypeOf('function'));
  finishSessionCheck(new Response(null, { status: 401 }));

  expect(await screen.findByRole('heading', { name: 'Log In' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeEnabled();
});
