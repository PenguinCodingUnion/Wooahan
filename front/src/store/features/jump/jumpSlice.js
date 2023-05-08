import { createSlice } from "@reduxjs/toolkit";

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

const initialState = {
  actionWord: -1,
};

export const jumpSlice = createSlice({
  name: "jump",
  initialState,
  reducers: {
    nextAction: (state) => {
      state.actionWord = state.actionWord + 1;
    },
    setAction: (state, { payload }) => {
      state.actionWord = payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});

export const jumpActions = jumpSlice.actions;

export default jumpSlice.reducer;
