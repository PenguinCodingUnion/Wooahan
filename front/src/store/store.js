import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import sleighReducer from "./features/sliegh/sleighSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sleigh: sleighReducer,
  },
});
