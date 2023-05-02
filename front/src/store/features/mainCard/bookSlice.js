import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    text: "ㄱ",
    modalIsVisible: false
}

export const bookSlice = createSlice({
    name: "bookModal",
    initialState,
    reducers: {
        openModal(state, action){
            state.text = action.payload
            state.modalIsVisible = true
        },
        closeModal(state){
            state.modalIsVisible = false
        }
    }
})

export const bookModalActions = bookSlice.actions;

export default bookSlice.reducer;