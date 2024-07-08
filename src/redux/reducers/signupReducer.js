import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../constant";

const initialState = {
    loading: false,
    user: null,
    error: null,
};

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

