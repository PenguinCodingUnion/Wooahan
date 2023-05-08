import { createSlice } from "@reduxjs/toolkit";
import { GameStatus } from "util/Enums.ts";

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

const initialState = {
  status: GameStatus.GAME_NOT_LOADED,
  level: 0,
};

export const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loaded: (state) => {
      state.status = GameStatus.GAME_READY;
    },
    start: (state) => {
      state.status = GameStatus.GAME_START;
    },
    pause: (state) => {
      state.status = GameStatus.GAME_PAUSE;
    },
    end: (state) => {
      state.status = GameStatus.GAME_END;
    },
    goNextLevel: (state) => {
      state.level += 1;
    },
    clearLevel: (state) => {
      state.status = GameStatus.GAME_NOT_LOADED;
      state.level = 0;
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

export const gameStatusActions = gameStatusSlice.actions;

// export const selectCount = (state) => state.counter.value;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default gameStatusSlice.reducer;
