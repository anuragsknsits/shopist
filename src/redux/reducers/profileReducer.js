import {
    FETCH_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE, UPDATE_PROFILE_FAILURE
} from "../constant";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PROFILE_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case FETCH_PROFILE_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, user: action.payload, loading: false }
        case UPDATE_PROFILE_FAILURE:
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
};
