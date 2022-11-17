
import { combineReducers } from "redux";
// import {combineReducers} from '@reduxjs/toolkit';
import errorReducer from "./errorReducer";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modelReducer";
import UserReducer from "../slicer/UserSlice";
import  DogReducer  from "../slicer/DogSlice"




const rootReducer = combineReducers({
    event: EventReducer ,
    user: UserReducer,
    dogs: DogReducer,
    events: EventsReducer,
    modalStatus: modalReducer,
    error: errorReducer
}) 

export default rootReducer;

