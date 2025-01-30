import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, CHECK_AUTH_STATE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE
} from "../constant";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  successMessage: null, // ✅ Added this to avoid undefined state issues
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
    case LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        successMessage: null, // ✅ Reset on logout
      };
    case CHECK_AUTH_STATE:
      return {
        ...state,
        loading: false,
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
    default:
      return state;
  }
};
