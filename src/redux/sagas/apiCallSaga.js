import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { LOGIN_REQUEST, REGISTER_REQUEST, CHECK_AUTH_STATE, LOGOUT_REQUEST } from "../constant";
import { registerSuccess, registerFailure } from '../../redux/actions/signupAction';
import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../../redux/actions/loginAction';
import axios from "../../api/axiosConfig";  // Use the new axios config
import Cookies from 'js-cookie';

function* apiCallSaga() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(REGISTER_REQUEST, registerUserSaga);
  yield takeLatest(CHECK_AUTH_STATE, checkAuthStateSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutUserSaga);
}

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/login', action.payload);
    yield put(loginSuccess(response.data));
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
  const token = Cookies.get('jwt');
  if (token) {
    try {
      const response = yield call(axios.get, '/auth/verifyToken');
      yield put(loginSuccess(response.data));
    } catch (error) {
      localStorage.removeItem('authToken');
      yield put(logoutSuccess());
    }
  } else {
    yield put(logoutSuccess());
  }
}

function* logoutUserSaga(action) {
  debugger;
  const { navigate } = action.payload;
  try {
    yield call(axios.post, '/auth/logout');
    yield put(logoutSuccess());
    Cookies.remove('jwt', { path: '/' });
    navigate('/login');
    window.location.reload();
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

export default apiCallSaga;
