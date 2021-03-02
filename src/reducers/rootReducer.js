import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    token: tokenReducer,
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
})