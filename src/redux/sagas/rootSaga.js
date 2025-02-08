import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import profileSaga from './profileSaga';
import roleSaga from './roleSaga';
import { watchChatbot } from "./chatBotSaga";

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), roleSaga(), watchChatbot()]);
}
