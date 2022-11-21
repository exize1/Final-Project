import { createSlice } from "@reduxjs/toolkit";

export const Assignments = createSlice({
    name: "assignments",
    initialState: {
        Assignments:[]
    }, 
    reducers: {
        updateAssignments: (state, values) => {
            state.Assignments =  values.payload;
        }
    }
})

export const { updateAssignments } = Assignments.actions
export const selectAssignments = (state) => state.assignments.Assignments

export default Assignments.reducer