import { Formik } from "formik";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addDogTreatment } from "../../../utils/apiCalls";
import Modal from "../../modal/Modal";
import * as Yup from "yup";
import Alert from "../../alert/Alert";


const NewTreatment = ({dog}) => {

    // let windoWidth = window.innerWidth;

    const [alert, setAlert] = useState(true)
    const [alertType,setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [vaccine, setVaccine] = useState(false)
    const [treatment, setTreatment] = useState("")
    const [inheritedOpen, setInheritedOpen] = useState(false)

    const handleDropdown = (value, vaccine) => {
        setTreatment(value)
        setVaccine(vaccine)
    }
    const handleSubmition = (values) => {
        setInheritedOpen(!inheritedOpen)
        addDogTreatment(dispatch, values, dog, treatment,handleAlerts)
  }

  const schema = Yup.object().shape({
    treatmentName: Yup.string()
        .required("נא להכניס את שם הטיפול"),
    description: Yup.string()
        .required("נא להכניס פירוט קצר"),
});

const handleAlerts = (data) => {
    setAlert(data.error)
    setAlertType(data.alertType)
    setAlertMessage(data.message)
}

const dispatch = useDispatch()

    return(
        <>
        <Modal title={`הוספת תיעוד טיפולי ל${dog.details.dogName}`} addOverflow={true} modalButtonName={"הוספת טיפול"} inheritedOpen={inheritedOpen}>
            <Formik
                initialValues={{
                    treatmentName: "",
                    description: "",
                    amount: ""
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
                    <div className="dropdown col-sm">
                        <div className="input-group mb-3 me-5">
                            <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{treatment ? treatment : "סוג טיפול"}</button>
                            <ul className="dropdown-menu scrollable-menu">
                                <li><a href="#choose-treatment" class="dropdown-item" dir='rtl' >בחר/י סוג טיפול...</a></li>
                                <li><hr class="dropdown-divider" /></li>

                                <li><a href="#drag" className="dropdown-item" dir='rtl' onClick={() => {handleDropdown("תרופה", true )}}>{"תרופה"}</a></li>
                                <li><a href="#vaccine" className="dropdown-item" dir='rtl' onClick={() => {handleDropdown("חיסון", true)}}>{"חיסון"}</a></li>
                                <li><a  href="#other"className="dropdown-item" dir='rtl' onClick={() => {handleDropdown("אחר")}}>{"אחר"}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='form-floating mb-3" col-sm-3' >
                        <input name="treatmentName" type="text" className="form-control input-sm" id="floatingInput" placeholder="שם"  value={values.treatmentName} onChange={handleChange} onBlur={handleBlur}/>
                        <label htmlFor="floatingInput">שם</label>
                        <p className="error-message">{errors.treatmentName && touched.treatmentName && errors.treatmentName}</p>
                    </div>
                    <div className='form-floating mb-3" col-sm-3' >
                        <input name="amount" type="text" className="form-control input-sm" id="floatingInput" placeholder="כמות"  value={values.amount} onChange={handleChange} onBlur={handleBlur} hidden={!vaccine} />
                        <label htmlFor="floatingInput" hidden={!vaccine}>כמות</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input name="description" type="text"  className="form-control" id="floatingInput" placeholder="פירוט" value={values.description} onChange={handleChange} onBlur={handleBlur}/>
                        <label htmlFor="floatingInput">פירוט</label>
                        <p className="error-message">{errors.description && touched.description && errors.description}</p>
                    </div>
                    <button type="submit" className="btn btn-primary my-4">הוספה</button>
                    <div className={`alert alert-${alertType} popup-alert mb-4`} role="alert" hidden={alert}>
                        {alertMessage}
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

export default NewTreatment
