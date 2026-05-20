import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { counterReducer } from "./counterReducer";

export const rootReducer=combineReducers({
    user:userReducer,
    count:counterReducer
}) 