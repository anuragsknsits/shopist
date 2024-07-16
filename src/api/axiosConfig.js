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
  async config => {

    // let csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    // console.log("as", csrfToken)
    // csrfToken = csrfToken ? csrfToken.split('=')[1] : null;

    // if (!csrfToken) {
    //   try {
    //     csrfToken = await fetchCsrfToken();
    //     document.cookie = `XSRF-TOKEN=${csrfToken}; path=/`;
    //     console.log("csrfToken", document.cookie)
    //   } catch (error) {
    //     console.error('Error fetching new CSRF token:', error);
    //   }
    // }

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    let token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
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
