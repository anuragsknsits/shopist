import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_PROFILE_REQUEST,
  fetchProfileSuccess,
  fetchProfileFailure,
} from '../actions';

function* fetchProfile() {
  try {
    const response = yield call(axios.get, 'http://localhost:8080/cart/allCart');
    yield put(fetchProfileSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
  }
}

function* profileSaga() {
  yield takeEvery(FETCH_PROFILE_REQUEST, fetchProfile);
}

export default profileSaga;
