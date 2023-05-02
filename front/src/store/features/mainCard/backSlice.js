import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page : 0,
}

export const backSlice = createSlice({
    name : "mainBackGround",
    initialState,
    reducers : {
        changeBackGround(state, action){
            state.page = action.payload
        }
    }
})

export const backActions = backSlice.actions;

export default backSlice.reducer;