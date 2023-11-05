import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  usersSliceReducer,
  signInStart,
  signInSuccess,
  signInFailure,
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
} from "./users/usersSlice";

const rootReducer = combineReducers({
  user: usersSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export {
  store,
  signInStart,
  signInSuccess,
  signInFailure,
  profileUpdateFailure,
  profileUpdateSuccess,
  profileUpdateStart,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
};

export const persistor = persistStore(store);
