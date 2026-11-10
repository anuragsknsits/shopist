import axios from 'axios';
import { fetchCsrfToken } from '../utils/fetchCsrfToken';

const gatewayURL = new URL(
  process.env.REACT_APP_GATEWAY_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : window.location.origin),
  window.location.origin
);

const instance = axios.create({
  baseURL: gatewayURL.href,
  withCredentials: true,
  xsrfCookieName: null, // Use the gateway's response token instead of the raw cookie.
  timeout: 15000,
});

const safeMethods = ['get', 'head', 'options', 'trace'];

instance.interceptors.request.use(async config => {
  if (new URL(instance.getUri(config), gatewayURL).origin !== gatewayURL.origin) {
    throw new Error('API requests must use the configured gateway origin.');
  }

  if (!safeMethods.includes(config.method.toLowerCase())) {
    const { headerName, token } = await fetchCsrfToken(instance);
    config.headers.set(headerName, token);
  }
  return config;
});

export default instance;
