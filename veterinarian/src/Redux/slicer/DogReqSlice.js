import { createSlice } from "@reduxjs/toolkit";

export const AdoptionSlice = createSlice({
    name: "dogRequests",
    initialState: {
        adoptionData:[]
    }, 
    reducers: {
        updateAdoption: (state, values) => {
            state.adoptionData =  values.payload;
        }
    }
})

export const { updateAdoption } = AdoptionSlice.actions
export const selectAdoption = (state) => state.dogRequests.adoptionData

export default AdoptionSlice.reducer