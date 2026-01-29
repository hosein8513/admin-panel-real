import { applyMiddleware, createStore } from "redux";
import rolesReducer from "./roles/reducer";
import { thunk } from "redux-thunk";

const store = createStore(rolesReducer,applyMiddleware(thunk))

export default store