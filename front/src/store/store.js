import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import backSlice from "./features/mainCard/backSlice";
import modalSlice from "./features/mainCard/modalSlice";
import levelSlice from "./features/mainCard/levelSlice";
import gameStatusSlice from "./features/gameStatus/gameStatusSlice";
import bookSlice from "./features/mainCard/bookSlice";
import sleighReducer from "./features/sliegh/sleighSlice";
import jumpSlice from "./features/jump/jumpSlice";
import loginSlice from './features/login/loginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    backGround: backSlice,
    modal: modalSlice,
    level: levelSlice,
    gameStatus: gameStatusSlice,
    bookText: bookSlice,
    sleigh: sleighReducer,
    jump: jumpSlice,
    loginInfo: loginSlice,
  },
});
