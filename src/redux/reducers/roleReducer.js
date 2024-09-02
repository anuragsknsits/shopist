import { FETCH_ROLES_REQUEST, FETCH_ROLES_SUCCESS, FETCH_ROLES_FAILURE } from "../constant";

const initialState = {
    roles: [],
    loading: false,
    error: null,
};

export const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROLES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ROLES_SUCCESS:
            return {
                ...state,
                loading: false,
                roles: action.payload,
            };
        case FETCH_ROLES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
