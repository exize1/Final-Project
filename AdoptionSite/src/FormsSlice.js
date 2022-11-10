import { createSlice } from "@reduxjs/toolkit";

export const FormsSlice = createSlice({
    name: "forms",
    initialState: {
        fullName: "",
        email: "",
        phone: ""
    }, 
    reducers: {
        update: (state, values) => {
            state.fullName =  values.payload.fullName;
            state.email =  values.payload.email;
            state.phone =  values.payload.phone;
        }
    }
})

export const {update} = FormsSlice.actions
export const selectForm = (state) => state.forms

export default FormsSlice.reducer