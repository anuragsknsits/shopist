// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS should be configured here
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { checkAuthState } from './redux/actions/loginAction';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';  // ✅ Added BrowserRouter here

// Check authentication state on app load
store.dispatch(checkAuthState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter> {/* ✅ Now App.js has access to useNavigate() */}
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
);

reportWebVitals();
