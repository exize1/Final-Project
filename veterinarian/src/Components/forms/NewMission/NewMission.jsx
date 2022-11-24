import './newMission.css'
import { Formik } from "formik";
import { useState } from 'react';
import { addAssignment } from '../../../utils/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../../Redux/slicer/Users';
import { selectDog } from '../../../Redux/slicer/DogSlice';
import Alert from '../../alert/Alert';
import * as Yup from "yup";


const NewMission = () => {
    const users = useSelector(selectUsers)
    const dogs = useSelector(selectDog)

    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    
    const schema = Yup.object().shape({
        details: Yup.string()
            .required("נא להכניס פרטי משימה"),
        dateToEnd: Yup.string()
            .required("נא להכניס תאריך סיום משימה")

    });

    const dispatch = useDispatch()
    const handleSubmition = (values) => {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        
        const value = {
            dogHandlerID: values.dogHandlerID,
            dateUpload: today,
            dateToEnd: values.dateToEnd,
            details: values.details,
            complited: false,
            dogNumber: values.dogNumber,
            
        };
        addAssignment(value, dispatch, handleAlerts)
    }     
    const handleAlerts = (data) => {
      setAlert(data.error)
      setAlertType(data.alertType)
      setAlertMessage(data.message)
    }

    return(
        <>
        <Formik
            initialValues={{
            dogHandlerName:"aa",
            dogHandlerID:"",
            dateUpload:"",
            dateToEnd:"",
            details:"",
            complited:"",
            dogNumber:"",
            }}
            onSubmit={(values) => {
                handleSubmition(values)
            }}
            validationSchema={schema}
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
                <div className="form-floating mb-3">
                    <input name="details" type="text" className="form-control" id="floatingInput" placeholder="תיאור המשימה" onChange={handleChange} value={values.details}  onBlur={handleBlur}/>
                    <label htmlFor="floatingInput">תיאור המשימה</label>
                    <p className="error-message">{errors.details && touched.details && errors.details}</p>
                </div>
                <div className="form-floating mb-3">
                    <input name="dateToEnd" type="date" className="form-control" id="floatingInput" placeholder="תאריך סיום המשימה" onChange={handleChange} value={values.dateToEnd} onBlur={handleBlur}/>
                    <label htmlFor="floatingInput">תאריך סיום המשימה</label>
                    <p className="error-message">{errors.dateToEnd && touched.dateToEnd && errors.dateToEnd}</p>
                </div>
                <div dir='ltr' className="input-group">
                    <select dir='rtl' name="dogHandlerID" className="form-select" id="inputGroupSelect02" onChange={handleChange} value={values.dogHandlerID} onBlur={handleBlur}>
                        <option defaultValue>כולם</option>
                        {users.map((user,index) => {
                                return(
                                    <option key={index} value={`${user._id}`}>{user.firstName} {user.lastName}</option>
                                )
                            })
                        }
                       
                    </select>
                    <label className="input-group-text" htmlFor="inputGroupSelect02"> כלבן</label>
                </div>
                <div dir='ltr' className="input-group">
                    <select dir='rtl' name="dogNumber" className="form-select" id="inputGroupSelect02" onChange={handleChange} value={values.category} onBlur={handleBlur}>
                    {dogs.map((dog, index) => {
                            if (dog.display) return(
                                <option key={index} value={`${dog.details.chipNumber}`}>{dog.details.chipNumber} {dog.details.dogName}</option>
                            ) 
                            else return null
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
        <Alert alertType={alertType} alert={alert} setAlert={setAlert}>
            {alertMessage}
        </Alert>
    </>                
    )
}

export default NewMission
