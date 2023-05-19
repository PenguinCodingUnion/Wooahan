import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceId: "",
  email: "",
  socialLogin: false,
  starCount: 0,
  rewards: null,
  name: "",
};

export const loginSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    getDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    getName: (state, action) => {
      state.name = action.payload;
    },
    successSocialLogin: (state) => {
      state.socialLogin = true;
    },
    getEmail: (state, action) => {
      state.email = action.payload;
    },
    getStarCount: (state, action) => {
      state.starCount = action.payload;
    },
    getRewards(state, action) {
      state.rewards = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
