import { Formik } from "formik";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateDogProfile } from "../../../utils/apiCalls";
import Alert from "../../alert/Alert";
import Modal from "../../modal/Modal";


const EditDogProfile = ({dog}) => {

    // let windoWidth = window.innerWidth;

    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")


    const [dogSize, setDogSize] = useState("")
    const [inheritedOpen, setInheritedOpen] = useState(false)


    const handleSubmition = (values) => {
        const value = {};
        let counter = 0
        if(values.chipNumber) {
            value.chipNumber = values.chipNumber;
            counter += 1
        }
        else value.chipNumber = dog.details.chipNumber

        if(values.dogName) {
            value.dogName = values.dogName;
            counter += 1
        }
        else value.dogName = dog.details.dogName

        if(values.weight) {
            value.weight = values.weight;
            counter += 1
        }
        else value.weight = dog.details.weight

        if(values.age) {
            value.age = values.age;
            counter += 1
        }
        else value.age = dog.details.age

        if(dogSize) {
            value.size = dogSize;
            counter += 1
        }
        else value.size = dog.details.size

        if(values.gender) {
            value.gender = values.gender;
            counter += 1
        }
        else value.gender = dog.details.gender
        
        value.src = dog.details.src
        value.description = dog.details.description
        counter !== 0 && updateDogProfile(dispatch, value, dog,handleAlerts)
        counter !== 0 && setInheritedOpen(!inheritedOpen)

  }

        const handleAlerts = (data) => {
        setAlert(data.error)
        setAlertType(data.alertType)
        setAlertMessage(data.message)
        console.log(alert, alertType, alertMessage );
    }
    const dispatch = useDispatch()

    return(
        <>
        <Modal title={`עריכת הפרופיל של ${dog.details.dogName}`}  modalButtonName={"עריכת פרופיל כלב"} inheritedOpen={inheritedOpen} >
            <Formik
                initialValues={{
                    dogName: "",
                    weight: "",
                    age: "",
                    gender: "",
                    chipNumber: "",
                    size: ""
                }}
                onSubmit={(values) => handleSubmition(values)}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                }) => (
                    <form dir='rtl' onSubmit={handleSubmit} noValidate>
                        {/* <Alert alertType={"success"} alert={success}>
                            הטופס נשלח הצלחה
                        </Alert>
                        <Alert alertType={"danger"} alert={fail}>
                            שגיאה בשליחת הטופס
                        </Alert> */}
                        <div className='form-container-page1'>
                            <div className='form-container-page1-first row'>
                                <div className="form-floating col-sm">
                                    <input name="dogName" type="text" className="form-control" id="floatingInput" placeholder="שם הכלב" onChange={handleChange} value={values.dogName} onBlur={handleBlur} />
                                    <label dir='rtl' htmlFor="floatingInput" className="form-label">שם הכלב</label>
                                    <p className="error-message">{errors.dogName && touched.dogName && errors.dogName}</p>
                                </div>
                                <div className="form-floating col-sm">
                                    <input name="weight" type="text" className="form-control" id="floatingInput" placeholder="משקל הכלב" onChange={handleChange} value={values.weight} onBlur={handleBlur} />
                                    <label dir='rtl' for="floatingInput" className="form-label" >משקל הכלב</label>
                                    <p className="error-message">{errors.weight && touched.weight && errors.weight}</p>
                                </div>
                                <div className="form-floating col-sm">
                                    <input name="age" type="text" className="form-control" id="floatingInput" placeholder="גיל הכלב" onChange={handleChange} value={values.age} onBlur={handleBlur} />
                                    <label dir='rtl' for="floatingInput" className="form-label"> גיל הכלב</label>
                                    <p className="error-message">{errors.age && touched.age && errors.age}</p>
                                </div>
                            </div>
                            <div className="form-floating">
                                <input name="chipNumber" type="text" className="form-control" id="floatingInput" placeholder="מספר שבב" onChange={handleChange} value={values.chipNumber} onBlur={handleBlur} />
                                <label dir='rtl' for="floatingInput" className="form-label"> מספר שבב</label>                            
                                <p className="error-message">{errors.treatment && touched.treatment && errors.treatment}</p>
                            </div>
                            
                            <div className='form-container-page1-fourth row'>
                                <div className="form-floating col-sm">
                                    <input name="gender" type="text" className="form-control" id="floatingInput" placeholder="מין החיה" onChange={handleChange} value={values.gender} onBlur={handleBlur} />
                                    <label dir='rtl' for="floatingInput" className="form-label">מין הכלב</label>
                                    <p className="error-message">{errors.gender && touched.gender && errors.gender}</p>
                                </div>
                                <div className="dropdown col-sm">
                                    <div className="input-group mb-3 me-5">
                                        <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSize ? dogSize : "גודל הכלב"}</button>
                                        <ul className="dropdown-menu scrollable-menu">
                                            <li><a href="size" class="dropdown-item" dir='rtl' >בחר/י גודל...</a></li>
                                            <li><hr class="dropdown-divider" /></li>

                                            <li><a href="#small" className="dropdown-item" dir='rtl' onClick={() => setDogSize("קטן")}>{"קטן"}</a></li>
                                            <li><a href="#medium" className="dropdown-item" dir='rtl' onClick={() => setDogSize("בינוני")}>{"בינוני"}</a></li>
                                            <li><a href="#big" className="dropdown-item" dir='rtl' onClick={() => setDogSize("גדול")}>{"גדול"}</a></li>
                                            {/* how to catch the value of the the dropdown? should we use yup?*/}
                                            {/* how to set dropdown going down instead of up> */}
                                            {/* to implement the fixxed dropdonw in the 2 other forms */}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <button type="submit" className="btn btn-primary ms-3 mb-4" >שליחה</button>
                        </div>
                    </form>
                )}
            </Formik>   
        </Modal> 
        <Alert alertType={alertType} alert={alert} setAlert={setAlert}>
        {alertMessage}
    </Alert>
    </>      
    )
}

export default EditDogProfile