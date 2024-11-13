// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
    },
    registrationSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    imageUploadStart: (state) => {
      state.loading = true;
    },
    imageUploadSuccess: (state) => {
      state.loading = false;
    },
    loadingStart: (state) => {
      state.loading = true;
    },
    loadingEnd: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {
  loginStart,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  loginSuccess,
  loginFailure,
  loadingStart,
  loadingEnd,
  logout
} = authSlice.actions;
export default authSlice.reducer;
