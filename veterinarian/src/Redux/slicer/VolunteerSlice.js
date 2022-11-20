import { createSlice } from "@reduxjs/toolkit";

export const VolunteerSlice = createSlice({
    name: "volunteer",
    initialState: {
        volunteerData:[]
    }, 
    reducers: {
        updateVolunteerData: (state, values) => {
            state.volunteerData =  values.payload;
        }
    }
})

export const { updateVolunteerData } = VolunteerSlice.actions
export const selectVolunteer = (state) => state.volunteer.volunteerData

export default VolunteerSlice.reducer