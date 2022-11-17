import { updateDogData } from "../Redux/slicer/DogSlice";
import { publicRequest } from "../requestMethods";


export const getDogs = (dispatch) => {
    publicRequest.get(`/api/dogs`)
        .then((res) => {
            res.data && dispatch(updateDogData(res.data))
        })
        .catch((err) => console.log(err));
}

export const sendForAdoptionSite = (dispatch, dog) => {
    const currentDate = new Date()
    const updates = {
        forAdopting: true,
        dates: {
            initialDate: dog.dates.initialDate,
            addForAdoptingDate: {
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
            },
            AdoptedDate: dog.dates.AdoptedDate
        }
    }
    publicRequest.put(`/api/dogs/${dog._id}`, updates)
    .then((res) => {
        res.data && console.log("updated");
        res.data && getDogs(dispatch);
    })
}    

export const approveAdotion = (dispatch, dog) => {
    const currentDate = new Date()
    const updates = {
        adopted: true,
        dates: {
            initialDate: dog.dates.initialDate,
            addForAdoptingDate: dog.dates.addForAdoptingDate,
            AdoptedDate: {
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
            }
        }
    }
    publicRequest.put(`/api/dogs/${dog._id}`, updates)
    .then((res) => {
        res.data && console.log("updated");
        res.data && getDogs(dispatch);
    })

}