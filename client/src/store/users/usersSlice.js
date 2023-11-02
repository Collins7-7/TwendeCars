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
      state.error = action.error;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = usersSlice.actions;
export const usersSliceReducer = usersSlice.reducer;
