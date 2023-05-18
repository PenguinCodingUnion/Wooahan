import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    text: "ㄱ",
    wordArray: [],
    modalIsVisible: false
}

export const bookSlice = createSlice({
    name: "bookModal",
    initialState,
    reducers: {
        setWordArray(state, action){
            // console.log(action.payload)
            state.wordArray = action.payload
        },
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