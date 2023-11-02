import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  usersSliceReducer,
  signInStart,
  signInSuccess,
  signInFailure,
} from "./users/usersSlice";

const rootReducer = combineReducers({
  users: usersSliceReducer,
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

export { store, signInStart, signInSuccess, signInFailure };

export const persistor = persistStore(store);
