import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { tokenReducer } from "./tokenReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    token: tokenReducer,
})