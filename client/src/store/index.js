import { configureStore } from "@reduxjs/toolkit";
import {
  usersSliceReducer,
  signInStart,
  signInSuccess,
  signInFailure,
} from "./users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
  devTools: true,
});

export { store, signInStart, signInSuccess, signInFailure };
