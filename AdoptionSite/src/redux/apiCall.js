import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, updateUserData } from "./slicers/UserSlice"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("/api/login", user)
        dispatch(updateUserData(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}