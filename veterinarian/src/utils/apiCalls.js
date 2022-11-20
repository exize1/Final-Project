import { updateDogData } from "../Redux/slicer/DogSlice";
import { updateVolunteerData } from "../Redux/slicer/VolunteerSlice";
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

export const updateDogProfile = (dispatch, value, dog) => {
    const updates = {}
    
    if(Object.values(value).length !==0) updates.details = value

    Object.values(updates).length !==0 && publicRequest.put(`/api/dogs/${dog._id}`, updates)
    .then((res) => {
        res.data && console.log("updated");
        res.data && getDogs(dispatch);
    })
}    

export    const addDogTreatment = (dispatch, values, dog, treatment) => {
    const dogTreatments = dog.treatments
    const newDogTreatments = [...dogTreatments]
    
    const currentDate  = new Date()
    const newTreatment = {
        type: treatment,
        treatmentName: values.treatmentName,
        treatmentDate: {
            date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
            hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
        },
        amount: values.amount,
        description: values.description
    };
    if(Object.values(newTreatment).length !==0) newDogTreatments.push(newTreatment)
    const updates = {
        treatments: newDogTreatments
    }
    publicRequest.put(`/api/dogs/${dog._id}`, updates)
    .then((res) => {
        res.data && console.log("updated");
        res.data && getDogs(dispatch);
    })
}    

export const deleteDog = (dispatch, dog) => {
    const updates = {
        display: false
    }
    publicRequest.put(`/api/dogs/${dog._id}`, updates)
    .then((res) => {
        res.data && console.log("updated");
        res.data && getDogs(dispatch);
    })
}    

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
    
    
