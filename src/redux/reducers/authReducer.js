import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
  FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILURE
} from "../constant";

const initialState = {
  isAuthenticated: false,
  checkingSession: true,
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null, // ✅ Reset success message on new request
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        checkingSession: false,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
        checkingSession: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CHANGE_PASSWORD_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null, 
        successMessage: null // ✅ Ensure previous success messages are cleared
      };
    case CHANGE_PASSWORD_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        successMessage: action.payload, 
        error: null // ✅ Ensure errors are cleared on success
      };
    case CHANGE_PASSWORD_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload,
        successMessage: null // ✅ Ensure success message is reset on failure
      };
    case FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        error: null
      };
    case FORGET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null
      };
    default:
      return state;
  }
};
