import { Formik } from "formik";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from "../../modal/Modal";
// import * as Yup from "yup";
import ActivityHours from "./ActivityHours";
import {createNewVolunteer} from '../../../utils/apiCalls'
import "./newVolunteer.css"
import Alert from "../../alert/Alert";

const NewVolunteering = ({dog}) => {

    // let windoWidth = window.innerWidth;

    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [inheritedOpen, setInheritedOpen] = useState(false)
    const [counter, setCounter] = useState(1)

    const [fromHour1, setFromHour1] = useState("")
    const [toHour1, setToHour1] = useState("")
    const [fromHour2, setFromHour2] = useState("")
    const [toHour2, setToHour2] = useState("")
    const [fromHour3, setFromHour3] = useState("")
    const [toHour3, setToHour3] = useState("")
    const [fromHour4, setFromHour4] = useState("")
    const [toHour4, setToHour4] = useState("")
    const [fromHour5, setFromHour5] = useState("")
    const [toHour5, setToHour5] = useState("")
    const [fromHour6, setFromHour6] = useState("")
    const [toHour6, setToHour6] = useState("")
    const [fromHour7, setFromHour7] = useState("")
    const [toHour7, setToHour7] = useState("")

    const [fromDay1, setFromDay1] = useState("")
    const [toDay1, setToDay1] = useState("")
    const [fromDay2, setFromDay2] = useState("")
    const [toDay2, setToDay2] = useState("")
    const [fromDay3, setFromDay3] = useState("")
    const [toDay3, setToDay3] = useState("")
    const [fromDay4, setFromDay4] = useState("")
    const [toDay4, setToDay4] = useState("")
    const [fromDay5, setFromDay5] = useState("")
    const [toDay5, setToDay5] = useState("")
    const [fromDay6, setFromDay6] = useState("")
    const [toDay6, setToDay6] = useState("")
    const [fromDay7, setFromDay7] = useState("")
    const [toDay7, setToDay7] = useState("")
    // const [addedActivityHours, setAddedActivityHours] = useState([])

    const handleAlerts = (data) => {
        setAlert(data.error)
        setAlertType(data.alertType)
        setAlertMessage(data.message)
        console.log(alert, alertType, alertMessage );
    }



    const handleSubmition = (values) => {
        setInheritedOpen(!inheritedOpen)
        setCounter(1)
        const days = [[fromDay1, toDay1]]
        const hours = [[fromHour1, toHour1]]
        if (fromDay2 || toDay2) days.push([fromDay2, toDay2])
        if (fromDay3 || toDay3) days.push([fromDay3, toDay3])
        if (fromDay4 || toDay4) days.push([fromDay4, toDay4])
        if (fromDay5 || toDay5) days.push([fromDay5, toDay5])
        if (fromDay6 || toDay6) days.push([fromDay6, toDay6])
        if (fromDay7 || toDay7) days.push([fromDay7, toDay7])

        fromHour2 && toHour2 && hours.push([fromHour2, toHour2])
        fromHour3 && toHour3 && hours.push([fromHour3, toHour3])
        fromHour4 && toHour4 && hours.push([fromHour4, toHour4])
        fromHour5 && toHour5 && hours.push([fromHour5, toHour5])
        fromHour6 && toHour6 && hours.push([fromHour6, toHour6])
        fromHour7 && toHour7 && hours.push([fromHour7, toHour7])
        const value = {
            titleName: values.titleName,
            description: values.description,
            activityHours:{
                fromDayToDay: days,
                fromHourToHour: hours
            },
            contactNum: values.contactNum
            }
            // console.log(value);
            createNewVolunteer(dispatch,value, handleAlerts)
  }

//   const schema = Yup.object().shape({
//     treatmentName: Yup.string()
//         .required("נא להכניס את שם הטיפול"),
//     description: Yup.string()
//         .required("נא להכניס פירוט קצר"),
// });

const dispatch = useDispatch()
// console.log(counter);
    return(
        <>
        <Modal  modalButtonName="הוספת התנדבות חדשה" btnType="success"  size={"medium"} title="הוספת התנדבות חדשה" addOverflow={true} inheritedOpen={inheritedOpen}>
            <Formik
                initialValues={{
                    titleName: "",
                    description: "",
                    fromHour: "",
                    toHour: "",
                    contactNum: ""
                }}
                onSubmit={(values) => {
                    handleSubmition(values)
                }}
                // validationSchema={schema}
            >
                {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                }) => (

                <form dir="rtl" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <div className="form-floating col-7 mb-3">
                            <input name="titleName" type="text"  className="form-control" id="floatingInput" placeholder="שם התנדבות" value={values.titleName} onChange={handleChange} onBlur={handleBlur}/>
                            <label dir='rtl' htmlFor="floatingInput">שם התנדבות</label>
                            <p className="error-message">{errors.titleName && touched.titleName && errors.titleName}</p>
                        </div>
                        <div dir='rtl' className='form-floating mb-3 col-sm-5' >
                        <input name="contactNum" type="text" className="form-control input-sm" id="floatingInput" placeholder="עד שעה"  value={values.contactNum} onChange={handleChange} onBlur={handleBlur}/>
                        <label htmlFor="floatingInput" >מספר איש קשר</label>
                    </div>
                    </div>
                    <div className="row">
                        <div className="form-floating col mb-3">
                            <textarea name='description' className="form-control add-rows" id="floatingInput" rows={3} placeholder="פירוט" onChange={handleChange} value={values.description} onBlur={handleBlur}></textarea>
                            <label dir='rtl' htmlFor="floatingInput" className="form-label">פירוט</label>
                            <p className="error-message">{errors.description && touched.description && errors.description}</p>
                        </div>
                    </div>
                    
                    <hr />
                    <ActivityHours fromHour={fromHour1} toHour={toHour1}  setToHour={setToHour1} setFromHour={setFromHour1} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay1} setToDay={setToDay1} setFromDay={setFromDay1} fromDay={fromDay1}/>
                    
                    {counter >= 2 && <ActivityHours fromHour={fromHour2} toHour={toHour2} setToHour={setToHour2} setFromHour={setFromHour2} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay2} setToDay={setToDay2} setFromDay={setFromDay2} fromDay={fromDay2}/>}
                    {counter >= 3 && <ActivityHours fromHour={fromHour3} toHour={toHour3} setToHour={setToHour3} setFromHour={setFromHour3} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay3} setToDay={setToDay3} setFromDay={setFromDay3} fromDay={fromDay3}/>}
                    {counter >= 4 && <ActivityHours fromHour={fromHour4} toHour={toHour4} setToHour={setToHour4} setFromHour={setFromHour4} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay4} setToDay={setToDay4} setFromDay={setFromDay4} fromDay={fromDay4}/>}
                    {counter >= 5 && <ActivityHours fromHour={fromHour5} toHour={toHour5} setToHour={setToHour5} setFromHour={setFromHour5} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay5} setToDay={setToDay5} setFromDay={setFromDay5} fromDay={fromDay5}/>}
                    {counter >= 6 && <ActivityHours fromHour={fromHour6} toHour={toHour6} setToHour={setToHour6} setFromHour={setFromHour6} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay6} setToDay={setToDay6} setFromDay={setFromDay6} fromDay={fromDay6}/>}
                    {counter >= 7 && <ActivityHours fromHour={fromHour7} toHour={toHour7} setToHour={setToHour7} setFromHour={setFromHour7} values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay7} setToDay={setToDay7} setFromDay={setFromDay7} fromDay={fromDay7}/>}
                    <div >
                        <button type="button" className="btn btn-secondary mb-4" onClick={() => setCounter(counter + 1)}  disabled={counter >= 7 && true}>הוספת שעות פעילות נוספות ליום ספציפי</button>
                    </div>
                        <button type="submit" className="btn btn-success my-4">הוספת התנדבות</button>
                    
                </form>
                )}
            </Formik>   
        </Modal>   
        {/* <div className={`alert alert-${alertType} popup-alert mb-4`} role="alert" hidden={!alert}>
            {alertMessage}
        </div>  */}
        <Alert alertType={alertType} alert={alert} setAlert={setAlert}>
            {alertMessage}
        </Alert>
        </>   
    )
}

export default NewVolunteering