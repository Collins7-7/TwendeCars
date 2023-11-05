import { createSlice } from "@reduxjs/toolkit";

// const testInitialState = {
//   currentUser: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null,
//   error: null,
//   loading: false,
// };
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      //   localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    profileUpdateStart: (state) => {
      state.loading = true;
    },
    profileUpdateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    profileUpdateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProfileStart: (state) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    deleteProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
} = usersSlice.actions;
export const usersSliceReducer = usersSlice.reducer;
