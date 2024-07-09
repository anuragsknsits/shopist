import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { LOGIN_REQUEST, REGISTER_REQUEST, CHECK_AUTH_STATE } from "../constant";
import { registerSuccess, registerFailure } from '../../redux/actions/signupAction';
import { loginSuccess, loginFailure, logout } from '../../redux/actions/loginAction';
import axios from "axios";

function* apiCallSaga() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(REGISTER_REQUEST, registerUserSaga);
  yield takeLatest(CHECK_AUTH_STATE, checkAuthStateSaga);
}

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:8080/auth/login', action.payload);
    yield put(loginSuccess(response.data));
    localStorage.setItem('authToken', response.data); // Save token to localStorage
    console.log(response.data);
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

function* checkAuthStateSaga() {
  const token = localStorage.getItem('authToken');
  console.log(token);
  if (token) {
    console.log("token");
    try {
      // const response = yield call(axios.get, 'http://localhost:8080/auth/verifyToken', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      yield put(loginSuccess(token));
    } catch (error) {
      console.log(localStorage.getItem('authToken'))
      localStorage.removeItem('authToken');
      yield put(logout());
    }
  }
}

export default apiCallSaga;