import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { 
  LOGIN_REQUEST, REGISTER_REQUEST, CHECK_AUTH_STATE, 
  LOGOUT_REQUEST, CHANGE_PASSWORD_REQUEST 
} from "../constant";
import { registerSuccess, registerFailure } from '../../redux/actions/signupAction';
import {
  loginSuccess, loginFailure, logoutSuccess,
  logoutFailure, changePasswordFailure, changePasswordSuccess
} from '../../redux/actions/loginAction';
import axios from "../../api/axiosConfig";  // Uses your CSRF & auth-configured axios

function* authSaga() {
  yield takeEvery(LOGIN_REQUEST, loginUserSaga);
  yield takeLatest(REGISTER_REQUEST, registerUserSaga);
  yield takeLatest(CHECK_AUTH_STATE, checkAuthStateSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutUserSaga);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
}

function* loginUserSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/login', action.payload, { withCredentials: true });
    yield put(loginSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

function* changePasswordSaga(action) {
  try {
    const response = yield call(axios.post, "/auth/change-password", action.payload, { withCredentials: true });
    yield put(changePasswordSuccess(response.data.message));
  } catch (error) {
    if (error.response?.status === 401) {
      yield put(logoutSuccess());  // If unauthorized, log out the user
    } else {
      yield put(changePasswordFailure(error.response?.data?.message || "Failed to change password"));
    }
  }
}

function* registerUserSaga(action) {
  try {
    const response = yield call(axios.post, '/auth/users', action.payload);
    yield put(registerSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || "Registration failed"));
  }
}

function* checkAuthStateSaga() {
  try {
    const response = yield call(axios.get, '/auth/verifyToken', { withCredentials: true });
    yield put(loginSuccess(response.data)); // Send user data
  } catch (error) {
    yield put(logoutSuccess());
  }
}

function* logoutUserSaga(action) {
  const { navigate } = action.payload;
  try {
    yield call(axios.post, '/auth/logout', {}, { withCredentials: true });
    yield put(logoutSuccess());
    if (navigate) {
      navigate("/login"); // ✅ Only call navigate if it's provided
    }
    window.location.reload();  // Ensure session is cleared
  } catch (error) {
    yield put(logoutFailure(error.response?.data?.message || "Logout failed"));
  }
}

export default authSaga;
