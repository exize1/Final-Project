import { configureStore } from "@reduxjs/toolkit";
import  FormsReducer  from "./FormsSlice"
import  DogReducer  from "./DogSlice"

export default configureStore({
    reducer:{
        forms: FormsReducer,
        dogs: DogReducer
    }
})

