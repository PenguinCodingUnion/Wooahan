import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import backSlice from "./features/mainCard/backSlice";
import modalSlice from './features/mainCard/modalSlice';
import levelSlice from './features/mainCard/levelSlice';
import gameStatusSlice from "./features/gameStatus/gameStatusSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    backGround : backSlice,
    modal: modalSlice,
    level: levelSlice,
    gameStatus: gameStatusSlice,
  },
});
