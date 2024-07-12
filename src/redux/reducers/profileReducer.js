import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE,
} from "../constant";

const initialState = {
    profile: null,
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
            return { ...state, profile: action.payload, loading: false };
        case FETCH_PROFILE_FAILURE:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};
