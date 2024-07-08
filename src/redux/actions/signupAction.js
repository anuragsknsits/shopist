import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../constant";

export const registerRequest = (user) => ({
    type: REGISTER_REQUEST,
    payload: user,
  });
  
  export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
  });
  
  export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
  });