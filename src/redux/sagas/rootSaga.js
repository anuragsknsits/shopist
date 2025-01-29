import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import profileSaga from './profileSaga';
import roleSaga from './roleSaga';

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), roleSaga()]);
}
