import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        usersData:[]
    }, 
    reducers: {
        updateUsers: (state, values) => {
            state.usersData =  values.payload;
        }
    }
})

export const { updateUsers } = usersSlice.actions
export const selectUsers = (state) => state.users.usersData

export default usersSlice.reducer