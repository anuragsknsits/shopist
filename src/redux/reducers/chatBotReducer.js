import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
} from '../constant';

const initialState = {
    messages: [{ text: "Hello! How can I help you?", sender: "bot" }],
    loading: false,
    error: null,
};

export const chatBotReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, sender: "user" }],
                loading: true,
            };

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, { text: action.payload, sender: "bot" }],
                loading: false,
            };

        case SEND_MESSAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

