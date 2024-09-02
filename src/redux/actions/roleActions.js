import {
    FETCH_ROLES_REQUEST,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_FAILURE,
  } from "../constant";
  
  export const fetchRolesRequest = () => ({
    type: FETCH_ROLES_REQUEST,
  });
  
  export const fetchRolesSuccess = (roles) => ({
    type: FETCH_ROLES_SUCCESS,
    payload: roles,
  });
  
  export const fetchRolesFailure = (error) => ({
    type: FETCH_ROLES_FAILURE,
    payload: error,
  });
  