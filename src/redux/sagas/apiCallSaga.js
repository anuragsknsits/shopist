import { put, takeEvery, call } from "redux-saga/effects";
import { FETCH_AUTH_KEY, SET_AUTH_KEY } from "../constant";
import axios from "axios";

function* apiCallSaga() {
    yield takeEvery(FETCH_AUTH_KEY, getDataFromAPI)
}

function* getDataFromAPI(user) {
    console.log('API call for user', user.data)
    const response = yield call(axios.post, 'http://localhost:8080/auth/login', user.data);
    console.log("response from API", response.data)
    yield put({ type: SET_AUTH_KEY, response })
}

export default apiCallSaga;