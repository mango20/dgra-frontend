import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  authUser: null,
  loading: false,
  error: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.authUser = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.authUser = null;
      state.loading = false;
      state.error = false;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
