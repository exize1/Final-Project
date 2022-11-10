import { createSlice } from "@reduxjs/toolkit";

export const DogSlice = createSlice({
    name: "dogs",
    initialState: {
        dogsData:[]
    }, 
    reducers: {
        updateDogData: (state, values) => {
            state.dogsData =  values.payload;
        }
    }
})

export const {updateDogData} = DogSlice.actions
export const selectDog = (state) => state.dogs.dogsData

export default DogSlice.reducer