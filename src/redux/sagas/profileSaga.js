import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchProfileSuccess, fetchProfileFailure, updateProfileSuccess, updateProfileFailure } from '../actions/profileActions';
import { FETCH_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST } from "../constant";
import axios from "../../api/axiosConfig";

function* fetchProfile() {
  try {
    const response = yield call(axios.get, '/auth/profile');
    yield put(fetchProfileSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
  }
}

function* updateProfileSaga(action) {
  try {
    console.log(action.payload);
    const response = yield call(axios.put, '/auth/profile', action.payload, { withCredentials: true });
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure(error.response?.data?.message || "Update failed"));
  }
}

function* profileSaga() {
  yield takeEvery(FETCH_PROFILE_REQUEST, fetchProfile);
  yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga);
}

export default profileSaga;
