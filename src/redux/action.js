import { FETCH_AUTH_KEY, SET_AUTH_KEY } from "./constant";

export const fetchAuthKey = (data) => {
    console.log("Action called", data);
    return {
        type : FETCH_AUTH_KEY,
        data
    }
}

export const setAuthKey = (data) => {
    console.log("Action called", data);
    return {
        type : SET_AUTH_KEY,
        data
    }
}