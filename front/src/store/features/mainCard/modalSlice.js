import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalIsVisible: false
}

export const modalSlice = createSlice({
    name: "settingModal",
    initialState,
    reducers: {
        openModal(state){
            state.modalIsVisible = true
        },
        closeModal(state){
            state.modalIsVisible = false
        }
    }
}) 

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;