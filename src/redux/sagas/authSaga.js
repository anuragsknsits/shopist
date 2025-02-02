import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { LOGIN_REQUEST, REGISTER_REQUEST, CHECK_AUTH_STATE, LOGOUT_REQUEST, CHANGE_PASSWORD_REQUEST } from "../constant";
import { registerSuccess, registerFailure } from '../../redux/actions/signupAction';
import {
  loginSuccess, loginFailure, logoutSuccess,
  logoutFailure, changePasswordFailure, changePasswordSuccess
}
  from '../../redux/actions/loginAction';
import axios from "../../api/axiosConfig";  // Use the new axios config
import Cookies from 'js-cookie';

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(REGISTER_REQUEST, registerUserSaga);
  yield takeLatest(CHECK_AUTH_STATE, checkAuthStateSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutUserSaga);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
}

function* changePasswordSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/change-password', action.payload);
    yield put(changePasswordSuccess(response.message));
  } catch (error) {
    if (error.response?.status === 401) {
      Cookies.remove('authToken');
      yield put(logoutSuccess());
    } else {
      yield put(changePasswordFailure(error.response?.data?.message || "Failed to change password"));
    }
  }
}

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/login', action.payload);
    Cookies.set('authToken', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
    yield put(loginSuccess(response.data.username));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* registerUserSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/register', action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* checkAuthStateSaga() {
  const token = Cookies.get('authToken');
  if (token) {
    try {
      yield call(axios.get, '/auth/verifyToken');
      yield put(loginSuccess());
    } catch (error) {
      Cookies.remove('authToken');
      yield put(logoutSuccess());
    }
  } else {
    yield put(logoutSuccess());
  }
}

function* logoutUserSaga(action) {
  const { navigate } = action.payload;
  try {
    yield call(axios.post, '/auth/logout');
    yield put(logoutSuccess());
    Cookies.remove('authToken', { path: '/' });
    navigate('/login');
    window.location.reload();
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export default authSaga;
