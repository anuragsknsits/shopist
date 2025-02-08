import { call, put, takeLatest } from "redux-saga/effects";
import { SEND_MESSAGE_REQUEST } from "../constant";
import { sendMessageSuccess, sendMessageFailure } from "../actions/chatBotActions";
import axios from "../../api/axiosConfig";

// Worker Saga
function* handleSendMessage(action) {
    try {
        const response = yield call(axios.post, '/chat/send', action.payload, { withCredentials: true });
        yield put(sendMessageSuccess(response));
    } catch (error) {
        yield put(sendMessageFailure("Failed to get response"));
    }
}

// Watcher Saga
export function* watchChatbot() {
    yield takeLatest(SEND_MESSAGE_REQUEST, handleSendMessage);
}

