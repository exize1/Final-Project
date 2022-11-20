
import { combineReducers } from "redux";
// import {combineReducers} from '@reduxjs/toolkit';
import errorReducer from "./errorReducer";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modelReducer";
import UserReducer from "../slicer/UserSlice";
import  DogReducer  from "../slicer/DogSlice"
import  AssignmentsReducer  from "../slicer/Assignments"
import  usersReducer  from "../slicer/Users"




const rootReducer = combineReducers({
    event: EventReducer ,
    user: UserReducer,
    assignments: AssignmentsReducer,
    users:usersReducer,
    dogs: DogReducer,
    events: EventsReducer,
    modalStatus: modalReducer,
    error: errorReducer
}) 

export default rootReducer;

