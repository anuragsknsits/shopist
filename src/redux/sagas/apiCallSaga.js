import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { LOGIN_REQUEST, REGISTER_REQUEST} from "../constant";
import {registerSuccess, registerFailure} from '../../redux/actions/signupAction';
import {loginSuccess, loginFailure} from '../../redux/actions/loginAction';
import axios from "axios";

function* apiCallSaga() {
    yield takeEvery(LOGIN_REQUEST, loginUserSaga);
    yield takeLatest(REGISTER_REQUEST, registerUserSaga);
}

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:8080/auth/login', action.payload);
    yield put(loginSuccess(response.data));
    localStorage.setItem('authToken', response.data.token); // Save token to localStorage
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* registerUserSaga(action) {
    try {
      const response = yield call(axios.post, 'http://localhost:8080/auth/signup', action.payload);
      yield put(registerSuccess(response.data));
    } catch (error) {
      yield put(registerFailure(error.message));
    }
  }

export default apiCallSaga;