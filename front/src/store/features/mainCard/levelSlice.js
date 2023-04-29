import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    level: 1
}

export const levelSlice = createSlice({
    name: "levelSelect",
    initialState,
    reducers: {
        selectLevel(state, action){
            state.level = action.payload
            console.log(state.level);
        }
    }
})

export const levelActions = levelSlice.actions;

export default levelSlice.reducer;