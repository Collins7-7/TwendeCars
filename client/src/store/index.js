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

import { userListingApi } from "./apis/userListing.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  user: usersSliceReducer,
  [userListingApi.reducerPath]: userListingApi.reducer,
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
    }).concat(userListingApi.middleware);
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

export {
  useGetSingleListingQuery,
  useGetUserListingsQuery,
  useAddListingMutation,
  useRemoveListingMutation,
  useUpdateListingMutation,
  useGetLandLordQuery,
} from "./apis/userListing.api";

export const persistor = persistStore(store);
