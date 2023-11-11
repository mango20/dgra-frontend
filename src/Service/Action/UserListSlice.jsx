import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userList: null,
  loading: false,
  error: false,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userListStart: (state) => {
      state.loading = true;
    },

    userListGetSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.userList = action.payload;
    },
    userListFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { userListStart, userListGetSuccess, userListFailure } =
  userListSlice.actions;

export default userListSlice.reducer;
