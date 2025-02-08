import {
    FETCH_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE, UPDATE_PROFILE_FAILURE,
} from '../constant';

export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

export const updateProfileRequest = (profile) => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: profile,
});

export const updateProfileSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile,
});

export const updateProfileFailure = (error) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error,
});
