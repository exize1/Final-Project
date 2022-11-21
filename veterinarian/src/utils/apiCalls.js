import Assignments, { updateAssignments } from "../Redux/slicer/Assignments";
import { updateDogData } from "../Redux/slicer/DogSlice";
import { updateUsers } from "../Redux/slicer/Users";
import { updateVolunteerData } from "../Redux/slicer/VolunteerSlice";
import { updateAdoption } from "../Redux/slicer/DogReqSlice";
import { publicRequest } from "../requestMethods";
import { updateReportData } from "../Redux/slicer/ReportsSlice";



export const getDogs = (dispatch) => {
    publicRequest.get(`/api/dogs`)
        .then((res) => {
            res.data && dispatch(updateDogData(res.data))
        })
        .catch((err) => console.log(err));
}
export const getAssignments = (dispatch) => {
    publicRequest.get(`/api/assigmnents`)
        .then((res) => {
            res.data && dispatch(updateAssignments(res.data))
        })
        .catch((err) => console.log(err));
}

export const addAssignment = (newAssignment) => {
    publicRequest.post(`/api/assigmnents`,newAssignment)
        .then((res) => {
            res.data && console.log(res.data);
        })
        .catch((err) => console.log(err));
}
export const finishAssignment = (dispatch, id, whoComplited) => {
    const report={
        whoComplited:whoComplited,
        status:true
    }
    publicRequest.patch(`/api/assigmnents/${id}`,report)
        .then((res) => {
            getAssignments(dispatch);
        })
        .catch((err) => console.log(err));
}

export const getUsers = (dispatch) => {
    publicRequest.get(`/api/users`)
        .then((res) => {
            res.data && dispatch(updateUsers(res.data))
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

    if (Object.values(value).length !== 0) updates.details = value

    Object.values(updates).length !== 0 && publicRequest.put(`/api/dogs/${dog._id}`, updates)
        .then((res) => {
            res.data && console.log("updated");
            res.data && getDogs(dispatch);
        })
}

export const addDogTreatment = (dispatch, values, dog, treatment) => {
    const dogTreatments = dog.treatments
    const newDogTreatments = [...dogTreatments]

    const currentDate = new Date()
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
    if (Object.values(newTreatment).length !== 0) newDogTreatments.push(newTreatment)
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

    publicRequest.get(`/api/volunteering`)
        .then((res) => {
            res.data && dispatch(updateVolunteerData(res.data))
        })
        .catch((err) => console.log(err));

    
    }


export const createNewVolunteer = (dispatch, body, handleAlerts) =>{
        publicRequest.post(`/api/volunteering`, body)
            .then((res) => {
                res.data && getVolunteers(dispatch)
                res.data && console.log(res.data);
                handleAlerts(res.data)
            })
            .catch((err) => console.log(err))
    }

    export const deleteVolunteer = (dispatch, volunteer) => {
        publicRequest.delete(`/api/volunteering/${volunteer._id}`)
        .then((res) => {
            res.data && console.log("updated");
            res.data && getVolunteers(dispatch);
        })
    }   

export const getDogRequests = (dispatch) => {
    publicRequest.get(`/api/dogRequests`)
        .then((res) => {
            res.data && dispatch(updateAdoption(res.data))
        })
        .catch((err) => console.log(err));
}
    
    
export const updateOldReqDog = (dispatch, dog) => {
    const updates = {
        newReq: false
    }
    publicRequest.put(`/api/dogRequests/${dog._id}`, updates)
    .then((res) => {
        res.data && console.log("updated");
        res.data && getDogRequests(dispatch);
    })
}

export const getReports = (dispatch) => {
    publicRequest.get(`api/reports`)
        .then((res) => {
            res.data && dispatch(updateReportData(res.data))
        })
}

export const updateStatus = (dispatch, value, report) => {
    const updates = {}
    updates.status = value

    publicRequest.put(`/api/reports/${report._id}`, updates)
        .then((res) => {
            res.data && getReports(dispatch);
        })
}
export const deleteStatus = (dispatch, value, report) => {
    const updates = {}
    updates.status = value

    publicRequest.delete(`/api/reports/${report._id}`, updates)
        .then((res) => {
            res.data && getReports(dispatch);
        })
}


export const gotTheAlert = (dispatch, userData, setNewAssignment) => {
    publicRequest.put(`/api/oldassigmnents/${userData._id}`)
    .then((res) => {
        res.data && getAssignments(dispatch);
        res.data && setNewAssignment(false);
    })
}