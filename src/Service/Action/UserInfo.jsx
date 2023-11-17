import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userInfo: null,
  error: false,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.loading = false;
      state.error = false;
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    errorUserInfo: (state) => {
      state.loading = false;
      state.error = true;
      state.isAuthenticated = false;
    },
  },
});

export const { errorUserInfo, setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
