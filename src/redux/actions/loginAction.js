import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CHECK_AUTH_STATE } from "../constant";

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

export const logout = () => ({
    type: LOGOUT,
});
