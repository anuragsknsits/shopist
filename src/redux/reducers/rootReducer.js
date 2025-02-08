import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { authReducer } from "./authReducer";
import { profileReducer } from "./profileReducer";
import { roleReducer } from "./roleReducer";
import { firmReducer } from "./firmReducer";
import { chatBotReducer } from "./chatBotReducer";

export default combineReducers({
    user: signupReducer,
    auth: authReducer,
    profile: profileReducer,
    role: roleReducer,
    firms: firmReducer,
    chatbot: chatBotReducer,
});