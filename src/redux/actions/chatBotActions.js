import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from '../constant';

export const sendMessageRequest = (message) => ({
  type: SEND_MESSAGE_REQUEST,
  payload: message,
});

export const sendMessageSuccess = (response) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: response,
});

export const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});
