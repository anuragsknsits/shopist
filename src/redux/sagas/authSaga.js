import { put, takeLeading, takeLatest, call } from "redux-saga/effects";
import { 
  LOGIN_REQUEST, REGISTER_REQUEST, CHECK_AUTH_STATE, 
  LOGOUT_REQUEST, CHANGE_PASSWORD_REQUEST, FORGET_PASSWORD_REQUEST
} from "../constant";
import { registerSuccess, registerFailure } from '../../redux/actions/signupAction';
import {
  loginSuccess, loginFailure, logoutSuccess,
  logoutFailure, changePasswordFailure, changePasswordSuccess,
  forgetPasswordSuccess, forgetPasswordFailure
} from '../../redux/actions/loginAction';
import axios from "../../api/axiosConfig";
import { checkAuthApi, loginApi, logoutApi, registerApi } from "../../api/authApi";

function* authSaga() {
  yield takeLeading(LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(REGISTER_REQUEST, registerUserSaga);
  yield takeLatest(CHECK_AUTH_STATE, checkAuthStateSaga);
  yield takeLeading(LOGOUT_REQUEST, logoutUserSaga);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
  yield takeLatest(FORGET_PASSWORD_REQUEST, forgetPasswordSaga);
}

function* loginUserSaga(action) {
  try {
    const response = yield call(loginApi, action.payload);
    try {
      yield call(checkAuthApi);
      yield put(loginSuccess(response.data));
    } catch {
      yield put(loginFailure("Could not verify the session. Check that cookies are enabled and try again."));
    }
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* changePasswordSaga(action) {
  try {
    const response = yield call(axios.post, "/auth/change-password", action.payload, { withCredentials: true });
    yield put(changePasswordSuccess(response.data.message || response.data));
  } catch (error) {
    yield put(changePasswordFailure(error.response?.data?.message || "Failed to change password"));
  }
}

function* registerUserSaga(action) {
  try {
    const response = yield call(registerApi, action.payload);
    yield put(registerSuccess(response.data));
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || "Registration failed"));
  }
}

function* checkAuthStateSaga() {
  try {
    const response = yield call(checkAuthApi);
    yield put(loginSuccess(response.data)); // Send user data
  } catch (error) {
    yield put(logoutSuccess());
  }
}

function* logoutUserSaga(action) {
  const { navigate } = action.payload;
  try {
    yield call(logoutApi);
    yield put(logoutSuccess());
    if (navigate) {
      navigate("/login");
    }
  } catch (error) {
    yield put(logoutFailure(error.response?.data?.message || "Logout failed"));
  }
}

function* forgetPasswordSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/forgot-password', { email: action.payload });
    yield put(forgetPasswordSuccess(response.data.message || response.data || 'Reset link sent!'));
  } catch (error) {
    yield put(forgetPasswordFailure(error.response?.data?.message || 'Failed to send reset link'));
  }
}

export default authSaga;
