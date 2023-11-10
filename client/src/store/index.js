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
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from "./users/usersSlice";

import { listingApi } from "./apis/listing.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  user: usersSliceReducer,
  [listingApi.reducerPath]: listingApi.reducer,
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
    }).concat(listingApi.middleware);
  },
  devTools: true,
});

setupListeners(store.dispatch);

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
  logoutStart,
  logoutSuccess,
  logoutFailure,
};

export { useAddListingMutation } from "./apis/listing.api";

export const persistor = persistStore(store);
