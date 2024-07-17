// src/api/authApi.js
import axios from "../../api/axiosConfig";  // Use the new axios config

export const loginApi = (credentials) => {
    return axios.post('/auth/login', credentials);
};

export const checkAuthApi = () => {
    return axios.get('/auth/verifyToken');
};

export const logoutApi = () => {
    return axios.post('/auth/logout');
};

export const registerApi = (payload) => {
    return axios.post('/auth/register', payload);
};

