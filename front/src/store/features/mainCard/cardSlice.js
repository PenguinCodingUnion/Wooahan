import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    prevPage: 0
}

export const cardSlice = createSlice({
    name: "prevCard",
    initialState,
    reducers: {
        savePrevCard(state, action){
            state.prevPage = action.payload
        }
    }
})

export const cardActions = cardSlice.actions;

export default cardSlice.reducer;