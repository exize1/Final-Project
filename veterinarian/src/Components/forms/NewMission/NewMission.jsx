import './newMission.css'
import { Formik } from "formik";
import { useState } from 'react';
import { addAssignment } from '../../../utils/apiCalls';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../Redux/slicer/Users';
import { selectDog } from '../../../Redux/slicer/DogSlice';
import Alert from '../../alert/Alert';


const NewMission = ({ className, }) => {
    const users = useSelector(selectUsers)
    const dogs = useSelector(selectDog)

    console.log(dogs);
    let windoWidth = window.innerWidth;

    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const handleSubmition = (values) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        const value = {
            dogHandlerName: values.dogHandlerName,
            dogHandlerID: "1",
            dateUpload: today,
            dateToEnd: values.dateToEnd,
            details: values.details,
            dogNumber: values.dogNumber
        };
        addAssignment(value, setAlert, setAlertMessage, setAlertType)
    }

    return (
        <Formik
            initialValues={{
                dogHandlerName: "",
                dogHandlerID: "",
                dateUpload: "",
                dateToEnd: "",
                details: "",
                complited: "",
                dogNumber: ""
            }}
            onSubmit={(values) => {
                handleSubmition(values)
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
            }) => (

                <form onSubmit={handleSubmit} noValidate>
                    <Alert alertType={alertType} alert={alert} setAlert={setAlert} >
                        {alertMessage}
                    </Alert>
                    <div className="form-floating mb-3">
                        <input name="details" type="text" className="form-control" id="floatingInput" placeholder="תיאור המשימה" onChange={handleChange} value={values.details} onBlur={handleBlur} />
                        <label htmlFor="floatingInput">תיאור המשימה</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="dateToEnd" type="date" className="form-control" id="floatingInput" placeholder="תאריך סיום המשימה" onChange={handleChange} value={values.dateToEnd} onBlur={handleBlur} />
                        <label htmlFor="floatingInput">תאריך סיום המשימה</label>
                    </div>
                    <div className="input-group">
                        <select name="dogHandlerName" className="form-select" id="inputGroupSelect02" onChange={handleChange} value={values.dogHandlerName} onBlur={handleBlur}>
                            <option defaultValue>כולם</option>
                            {

                                users.map((user) => {
                                    return (
                                        <option value={`${user.firstName}`}>{user.firstName} {user.lastName}</option>
                                    )
                                })
                            }

                        </select>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">    כלבן</label>
                    </div>
                    <div className="input-group">
                        <select name="dogNumber" className="form-select" id="inputGroupSelect02" onChange={handleChange} value={values.category} onBlur={handleBlur}>
                            {dogs.map((dog, index) => {
                                if (dog.display) return (

                                    <option key={index} value={`${dog.details.chipNumber}`}>{dog.details.chipNumber} {dog.details.dogName}</option>
                                )
                            })}


                        </select>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">בחר כלב</label>
                    </div>

                    <button type="submit" className="btn btn-primary my-4">הוספה</button>
                    <div className={`alert alert-${alertType} popup-alert mb-4`} role="alert" hidden={alert}>
                        {alertMessage}
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default NewMission