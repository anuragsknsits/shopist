import { all } from 'redux-saga/effects';
import apiCallSaga from './apiCallSaga';
import profileSaga from './profileSaga';
import roleSaga from './roleSaga';

export default function* rootSaga() {
  yield all([apiCallSaga(), profileSaga(), roleSaga()]);
}
