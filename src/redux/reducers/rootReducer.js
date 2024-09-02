import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { roleReducer } from "./roleReducer";

export default combineReducers({
    user: signupReducer,
    auth: authReducer,
    profile: profileReducer,
    role: roleReducer,
});