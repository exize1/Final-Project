import { updateVolunteerData } from "../redux/slicer/VolunteerSlice";
import { publicRequest } from "../requestMethods";


export const getVolunteers = (dispatch) =>{
    let data = []
    publicRequest.get(`/api/volunteering`)
        .then((res) => {
            res.data && dispatch(updateVolunteerData(res.data))
        })
        .catch((err) => console.log(err));
        console.log(data);
    return data
    }