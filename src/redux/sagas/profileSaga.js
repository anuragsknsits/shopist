import { call, put, takeEvery } from 'redux-saga/effects';
import {fetchProfileSuccess, fetchProfileFailure} from '../actions/profileActions';
import {FETCH_PROFILE_REQUEST} from "../constant";
import axios from "../../api/axiosConfig"; 

function* fetchProfile() {
  try {
    console.log("fetchProfile");
    const response = yield call(axios.get, '/cart/allCart');
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
