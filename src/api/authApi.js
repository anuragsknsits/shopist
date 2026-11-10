import axios from './axiosConfig';

export const loginApi = credentials => axios.post('/auth/login', credentials);
export const checkAuthApi = () => axios.get('/auth/verifyToken');
export const logoutApi = () => axios.post('/auth/logout');
export const registerApi = payload => axios.post('/auth/register', payload);
