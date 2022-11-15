import './newMission.css'
import { Formik } from "formik";
import { useState } from 'react';


const NewMission = ({className}) => {

    let windoWidth = window.innerWidth;

    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")

    const handleSubmition = (values) => {
        const value = {
           
        };
        console.log(value)
  }

    return(
        <Formik
            initialValues={{
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
                <div className="form-floating mb-3">
                    <input name="productName" type="text"  className="form-control" id="floatingInput" placeholder="תיאור המשימה" value={values.productName} onBlur={handleBlur}/>
                    <label htmlFor="floatingInput">תיאור המשימה</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="productName" type="date"  className="form-control" id="floatingInput" placeholder="תאריך סיום המשימה" value={values.productName} onBlur={handleBlur}/>
                    <label htmlFor="floatingInput">תאריך סיום המשימה</label>
                </div>
                <div className="input-group">
                    <select name="category" className="form-select" id="inputGroupSelect02" onChange={handleChange} value={values.category} onBlur={handleBlur}>
                        <option defaultValue>כולם</option>
                        <option value="collectibles">Collectibles & Art</option>
                    </select>
                    <label className="input-group-text" htmlFor="inputGroupSelect02">כלבן</label>
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