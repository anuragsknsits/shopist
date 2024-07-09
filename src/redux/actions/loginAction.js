import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, CHECK_AUTH_STATE
} from "../constant";

export const loginRequest = (credentials) => ({
    type: LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const checkAuthState = () => ({
    type: CHECK_AUTH_STATE,
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error,
});

