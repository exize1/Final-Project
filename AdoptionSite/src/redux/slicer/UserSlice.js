import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        userData:{},
        isFetching: false,
    }, 
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        updateUserData: (state, action) => {
            state.userData =  action.payload;
            state.isFetching = false
        },
        loginFailure: (state) => {
            state.isFetching = false
        }
    }
})

export const {loginStart, updateUserData, loginFailure} = UserSlice.actions
export const selectUser = (state) => state.user.userData
export const selectFetching = (state) => state.user.isFetching

export default UserSlice.reducer