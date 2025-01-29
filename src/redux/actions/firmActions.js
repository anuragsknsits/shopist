import { FETCH_FIRMS_REQUEST, FETCH_FIRMS_SUCCESS, FETCH_FIRMS_FAILURE } from '../constant';

// Action to fetch firms
export const fetchFirmsRequest = () => {
  return {
    type: FETCH_FIRMS_REQUEST
  };
};

export const fetchFirmsSuccess = (firms) => {
  return {
    type: FETCH_FIRMS_SUCCESS,
    payload: firms
  };
};

export const fetchFirmsFailure = (error) => {
  return {
    type: FETCH_FIRMS_FAILURE,
    payload: error
  };
};
