import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import backSlice from "./features/mainCard/backSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    backGround : backSlice,
  },
});
