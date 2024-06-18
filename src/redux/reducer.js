import { FETCH_AUTH_KEY } from "./constant"

export const authKey = (data = [], action) => {
    switch (action.type) {
        case FETCH_AUTH_KEY:
            console.log("Reducer called")
            return [action.data, ...data];

        default:
            return [];
    }
}