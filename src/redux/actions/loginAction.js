import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_FAILURE, LOGOUT_SUCCESS, LOGOUT_REQUEST, CHECK_AUTH_STATE
    , CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE
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

export const logoutRequest = (navigate) => ({
    type: LOGOUT_REQUEST,
    payload: { navigate },
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
    type: LOGOUT_FAILURE,
    payload: error,
});

export const changePasswordRequest = (payload) => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload,
});

export const changePasswordSuccess = (message) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: message,
});

export const changePasswordFailure = (error) => ({
    type: CHANGE_PASSWORD_FAILURE,
    payload: error,
});

