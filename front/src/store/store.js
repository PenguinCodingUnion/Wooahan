import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import gameStatusSlice from "./features/gameStatus/gameStatusSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    gameStatus: gameStatusSlice,
  },
});
