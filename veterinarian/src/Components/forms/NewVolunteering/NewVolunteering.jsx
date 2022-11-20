import { Formik } from "formik";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import Modal from "../../modal/Modal";
import * as Yup from "yup";
import ActivityHours from "./ActivityHours";


const NewVolunteering = ({dog}) => {

    let windoWidth = window.innerWidth;

    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [inheritedOpen, setInheritedOpen] = useState(false)
    const [fromDay, setFromDay] = useState("")
    const [toDay, setToDay] = useState("")
    const [fromHour, setFromHour] = useState("")
    const [toHour, setToHour] = useState("")
    const [counter, setCounter] = useState(1)
    const [addedActivityHours, setAddedActivityHours] = useState([])

    const duplicateArr = (counter) => {
        const arr = []
        for (let index = 0; index < counter; index++) {
            arr[index] = "x" ;
        }
        setAddedActivityHours(arr)
        console.log(arr);
    }

    const duplicateActivityHours = () => {
        duplicateArr(counter)
    }


    const handleSubmition = (values) => {
        // setInheritedOpen(!inheritedOpen)
        const value = {
            titleName: values.titleName,
            description: values.description,
            activityHours:{
                fromDayToDay: [fromDay, toDay],
                fromHourToHour: [values.fromHour, values.toHour]
            },
            contactNum: values.contactNum
            }
            // console.log(value);
  }

  const schema = Yup.object().shape({
    treatmentName: Yup.string()
        .required("נא להכניס את שם הטיפול"),
    description: Yup.string()
        .required("נא להכניס פירוט קצר"),
});

const dispatch = useDispatch()

    return(
        <Modal  modalButtonName="הוספת התנדבות חדשה" btnType="success"  size={"large"} title="הוספת התנדבות חדשה" addOverflow={true} inheritedOpen={inheritedOpen}>
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

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-floating mb-3">
                        <input name="titleName" type="text"  className="form-control" id="floatingInput" placeholder="שם התנדבות" value={values.titleName} onChange={handleChange} onBlur={handleBlur}/>
                        <label dir='rtl' htmlFor="floatingInput">שם התנדבות</label>
                        <p className="error-message">{errors.titleName && touched.titleName && errors.titleName}</p>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea name='description' className="form-control" id="floatingInput" rows="3" placeholder="פירוט" onChange={handleChange} value={values.description} onBlur={handleBlur}></textarea>
                        <label dir='rtl' htmlFor="floatingInput" className="form-label">פירוט</label>
                        <p className="error-message">{errors.description && touched.description && errors.description}</p>
                    </div>
                    <hr />
                    <button type="button" className="btn btn-success" onClick={() => {
                                setCounter(counter + 1)
                                duplicateActivityHours()}}  >הוספת שעות פעילות נוספות ליום ספציפי</button>
                    
                    <ActivityHours values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay} setToDay={setToDay} setFromDay={setFromDay} fromDay={fromDay}/>
                    
                    {addedActivityHours.map(item => {
                        return(
                            <ActivityHours values={values} handleChange={handleChange} handleBlur={handleBlur} toDay={toDay} setToDay={setToDay} setFromDay={setFromDay} fromDay={fromDay}/>
                        )
                    })}
                    
                    <div dir='rtl' className='form-floating mb-3 col-sm-3' >
                        <input name="contactNum" type="text" className="form-control input-sm" id="floatingInput" placeholder="עד שעה"  value={values.contactNum} onChange={handleChange} onBlur={handleBlur}/>
                        <label htmlFor="floatingInput" >מספר איש קשר</label>
                    </div>

                    <button type="submit" className="btn btn-primary my-4">הוספה</button>
                    <div className={`alert alert-${alertType} popup-alert mb-4`} role="alert" hidden={alert}>
                        {alertMessage}
                    </div>
                </form>
                )}
            </Formik>   
        </Modal>       
    )
}

export default NewVolunteering