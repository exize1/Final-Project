import { updateDogData } from "../Redux/slicer/DogSlice";
import { publicRequest } from "../requestMethods";


export const getDogs = (dispatch) => {
    publicRequest.get(`/api/dogs`)
        .then((res) => {
            res.data && dispatch(updateDogData(res.data))
        })
        .catch((err) => console.log(err));
}