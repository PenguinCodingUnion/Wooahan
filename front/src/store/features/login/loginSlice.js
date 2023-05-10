import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    starCount: 0,
    rewards: null,
}

export const loginSlice = createSlice({
    name: "loginInfo",
    initialState,
    reducers: {
        getStarCount :(state, action) => {
            console.log("hey");
            state.starCount = action.payload
        },
        getRewards(state, action){
            state.rewards = action.payload
        }
    }
})

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;