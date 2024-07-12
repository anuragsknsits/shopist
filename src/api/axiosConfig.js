import axios from 'axios';

// Create an Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Important for cookies to be sent
});

// Initialize CSRF token
let csrfToken = null;

const csrfInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// Function to fetch CSRF token
const fetchCsrfToken = async () => {
  try {
    const response = await csrfInstance.get('/csrf-token');
    csrfToken = response.data.token;
    console.log('Fetched CSRF Token :', csrfToken);
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// Fetch CSRF token once at the start
fetchCsrfToken();

// Add a request interceptor to include CSRF token and Authorization header
instance.interceptors.request.use(
  config => {
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    const token = localStorage.getItem('authToken'); // Assume token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
