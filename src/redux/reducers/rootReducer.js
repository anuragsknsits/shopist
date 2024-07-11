import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";

export default combineReducers({
    user: signupReducer,
    auth: authReducer,
    profile: profileReducer,
});