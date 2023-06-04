import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";

const store = configureStore({
  reducer: {
    Auth: AuthReducer, // Specify the key as "auth"
  },
});

export default store;
