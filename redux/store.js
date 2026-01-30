import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/reducer";

// const store = createStore(userReducer,applyMiddleware(thunk))

const store = configureStore({
    reducer:{
        userReducer
    }
})

export default store