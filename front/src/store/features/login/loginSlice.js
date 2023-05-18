import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email: "",
    socialLogin: false,
    starCount: 0,
    rewards: null,
}

export const loginSlice = createSlice({
    name: "loginInfo",
    initialState,
    reducers: {
        successSocialLogin: (state) => {
            state.socialLogin = true;
        },
        getEmail: (state, action) => {
            state.email = action.payload
        },
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