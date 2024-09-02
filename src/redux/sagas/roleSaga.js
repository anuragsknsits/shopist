import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_ROLES_REQUEST } from "../constant";
import { fetchRolesSuccess, fetchRolesFailure } from '../actions/roleActions';
import axios from "../../api/axiosConfig"; 

function* fetchRolesSaga() {
  try {
    const response = yield call(axios.get, '/auth/roles');
    yield put(fetchRolesSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchRolesFailure(error.message));
  }
}

function* roleSaga() {
  yield takeEvery(FETCH_ROLES_REQUEST, fetchRolesSaga);
}

export default roleSaga;
