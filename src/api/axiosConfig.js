import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,  // Important for cookies to be sent
});

let csrfToken = null;

const csrfInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

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

instance.interceptors.request.use(
    config => {
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
