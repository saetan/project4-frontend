import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "states",
  initialState: {
    isLoggedIn: false,
    role: "",
  },
  reducers: {
    toggleLoginState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    updateRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { toggleLoginState, updateRole } = stateSlice.actions;

export default stateSlice.reducer;
