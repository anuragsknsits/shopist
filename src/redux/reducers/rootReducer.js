import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { authKey } from "./reducer";

export default combineReducers({
    user: signupReducer,
    auth: authKey,
});