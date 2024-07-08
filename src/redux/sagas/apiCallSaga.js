import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { FETCH_AUTH_KEY, SET_AUTH_KEY ,REGISTER_REQUEST} from "../constant";
import {registerSuccess, registerFailure} from '../../redux/actions/signupAction';
import axios from "axios";

function* apiCallSaga() {
    yield takeEvery(FETCH_AUTH_KEY, getDataFromAPI);
    yield takeLatest(REGISTER_REQUEST, registerUserSaga);
}


function* getDataFromAPI(user) {
    console.log('API call for user', user.data)
    const response = yield call(axios.post, 'http://localhost:8080/auth/login', user.data);
    console.log("response from API", response.data)
    yield put({ type: SET_AUTH_KEY, response })
}

function* registerUserSaga(action) {
    try {
      const response = yield call(axios.post, 'http://localhost:8080/auth/register', action.payload);
      yield put(registerSuccess(response.data));
    } catch (error) {
      yield put(registerFailure(error.message));
    }
  }

export default apiCallSaga;