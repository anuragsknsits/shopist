import { all } from 'redux-saga/effects';
import apiCallSaga from './apiCallSaga';
import profileSaga from './profileSaga';

export default function* rootSaga() {
  yield all([apiCallSaga(), profileSaga()]);
}
