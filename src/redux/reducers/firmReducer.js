import { FETCH_FIRMS_REQUEST, FETCH_FIRMS_SUCCESS, FETCH_FIRMS_FAILURE } from "../constant";

const initialState = {
  firms: [],
  loading: false,
  error: null
};

export const firmReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIRMS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_FIRMS_SUCCESS:
      return {
        ...state,
        loading: false,
        firms: action.payload
      };
    case FETCH_FIRMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

