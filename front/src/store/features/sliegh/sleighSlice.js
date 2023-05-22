import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { game } from "api/game";

export const getQuizData = createAsyncThunk(
  "sleigh/getQuizData",
  (difficulty) => {
    try {
      return game.get.run(difficulty);
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  isStart: false,
  isEnd: false,
  quizStatus: "idle",
  quizCount: 0,
  quizResult: "left",
  quizData: [],
  modelAnimations: null,
  status: "idle",
};

export const sleighSlice = createSlice({
  name: "sleigh",
  initialState,
  reducers: {
    setIsStart: (state, action) => {
      state.isStart = action.payload;
    },
    setIsEnd: (state, action) => {
      state.isEnd = action.payload;
    },
    setQuizStatus: (state, action) => {
      state.quizStatus = action.payload;
    },
    setQuizCount: (state, action) => {
      state.quizCount = action.payload;
    },
    setQuizResult: (state, action) => {
      state.quizResult = action.payload;
    },
    setModelAnimations: (state, action) => {
      state.modelAnimations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuizData.fulfilled, (state, action) => {
        state.status = "idle";
        state.quizData = action.payload;
      })
      .addCase(getQuizData.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const sleighActions = sleighSlice.actions;

export default sleighSlice.reducer;
