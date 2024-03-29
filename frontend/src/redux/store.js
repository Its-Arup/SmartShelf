import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as bookReducer } from "./books/reducer";

// export const baseURL = process.env.REACT_APP_BASE_URL;

const rootReducer = combineReducers({
    authReducer,
    bookReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));