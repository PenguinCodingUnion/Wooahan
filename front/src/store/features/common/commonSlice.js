import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warning: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setWarning: (state) => {
      state.warning = !state.warning;
    },
  },
});

export const commonActions = commonSlice.actions;

export default commonSlice.reducer;
