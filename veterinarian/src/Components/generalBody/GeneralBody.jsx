import './generalBody.css'
import Modal from '../../Components/modal/Modal';
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
// import Axios from 'axios'

const GeneralBody = ({ panelTitle, addOverFlow, children }) => {
    const [dogSize, setDogSize] = useState("")
    // const [submited, setSubmited] = useState(false)
    // let windowWidth = window.innerWidth;
    const schema = Yup.object().shape({
        dogName: Yup.string()
            .required("נא להכניס את שם הכלב"),
        dogWeight: Yup.string()
            .required("נא להכניס את משקל הכלב"),
        dogAge: Yup.string()
            .required("נא לכניס את גיל הכלב"),
        dogSex: Yup.string()
            .required("נא לכניס את המין "),
        dogCare: Yup.string()
            .required("נא להכניס את הטיפול הניתן לכלב"),
        dogSize: Yup.string()
            .required("נא להכניס את גודל הכלב"),
        type: Yup.string()
            .required("נא להכניס את סוג החיה"),
        color: Yup.string()
            .required("נא להכניס את צבע החיה"),
        place: Yup.string()
            .required("נא להכניס את מקום הדיווח"),
        when: Yup.string()
            .required("נא להכניס את זמן הדיווח"),
    });
    const handleSubmition = (values) => {
        const value = {
            dogName: values.dogName,
            dogWeight: values.dogWeight,
            dogAge: values.dogAge,
            dogSex: values.dogSex,
            dogCare: values.dogCare,
            dogSize: values.dogSize
        };

        // const submit = () => {
        //     setSubmited(true)
        // }

        // useEffect(() => {
        //     if (submited !== false) {
        //         postReport(value)
        //         alert("הדיווח נשלח")
        //     }
        // })

        // const postReport = (report) => {
        //     Axios.post(`${process.env.REACT_APP_SECRET_NAME_url}/api/animals`, report)
        //         .then(console.log(report))
        // }


        // dispatch(update(value));
    };
    return (
        <div className='general-body'>
            <h1>{panelTitle}</h1>
            <div className={addOverFlow ? 'add-overflow children-container' : 'children-container'}>
                {children}
            </div>
            <div className='new-dog'>
                <Modal addOverflow={true} modalButtonName={"הוסף כלב חדש למאגר העירוני"} btnType="success" footer={true} size="medium" title="הוספת כלב חדש למאגר העירוני">
                    <div className='petform-footer-container'>
                        <div className='form-contact-container'>
                            <div className="form-container">
                                <Formik
                                    initialValues={{
                                        dogName: "",
                                        dogWeight: "",
                                        dogAge: "",
                                        dogSex: "",
                                        dogCare: "",
                                        dogSize: ""
                                    }}
                                    onSubmit={(values) => handleSubmition(values)}
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
                                        <form dir='rtl' onSubmit={handleSubmit} noValidate>

                                            <div className='form-container-page1'>
                                                <div className='form-container-page1-first row'>
                                                    <div className="form-floating col-sm">
                                                        <input name="dogName" type="text" className="form-control" id="floatingInput" placeholder="שם הכלב" onChange={handleChange} value={values.dogName} onBlur={handleBlur} />
                                                        <label dir='rtl' htmlFor="floatingInput" className="form-label">שם הכלב*</label>
                                                        <p className="error-message">{errors.dogName && touched.dogName && errors.dogName}</p>
                                                    </div>
                                                    <div className="form-floating col-sm">
                                                        <input name="dogWeight" type="text" className="form-control" id="floatingInput" placeholder="משקל הכלב" onChange={handleChange} value={values.dogWeight} onBlur={handleBlur} />
                                                        <label dir='rtl' for="floatingInput" className="form-label" >משקל הכלב*</label>
                                                        <p className="error-message">{errors.dogWeight && touched.dogWeight && errors.dogWeight}</p>
                                                    </div>
                                                    <div className="form-floating col-sm">
                                                        <input name="dogAge" type="text" className="form-control" id="floatingInput" placeholder="גיל הכלב" onChange={handleChange} value={values.dogAge} onBlur={handleBlur} />
                                                        <label dir='rtl' for="floatingInput" className="form-label"> גיל הכלב*</label>
                                                        <p className="error-message">{errors.dogAge && touched.dogAge && errors.dogAge}</p>
                                                    </div>
                                                </div>
                                                <div className="form-floating">
                                                    <textarea name='dogCare' className="form-control" id="floatingInput" rows="3" placeholder="טיפול שנתין לכלב" onChange={handleChange} value={values.dogCare} onBlur={handleBlur}></textarea>
                                                    <label dir='rtl' for="floatingInput" className="form-label">טיפול שניתן לכלב*</label>
                                                    <p className="error-message">{errors.dogCare && touched.dogCare && errors.dogCare}</p>
                                                </div>
                                                <div className='form-container-page1-second row'>
                                                    <div className="form-floating col-sm">
                                                        <input name="dogSex" type="text" className="form-control" id="floatingInput" placeholder="מין החיה" onChange={handleChange} value={values.dogSex} onBlur={handleBlur} />
                                                        <label dir='rtl' for="floatingInput" className="form-label">מין החיה*</label>
                                                        <p className="error-message">{errors.dogSex && touched.dogSex && errors.dogSex}</p>
                                                    </div>

                                                    {/* <div className="form-floating col-sm">
                                                        <input name="dogSize" type="text" className="form-control" id="floatingInput" placeholder="גודל הכלב" onChange={handleChange} value={values.dogSize} onBlur={handleBlur} />
                                                        <label dir='rtl' for="floatingInput" className="form-label">גודל הכלב*</label>
                                                        <p className="error-message">{errors.dogSize && touched.dogSize && errors.dogSize}</p>
                                                    </div> */}

                                                    <div className="dropdown col-sm">
                                                        <div className="input-group mb-3">
                                                            <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSize ? dogSize : "גודל הכלב"}</button>
                                                            <ul className="dropdown-menu scrollable-menu">
                                                                <li><a class="dropdown-item" dir='rtl' >בחר/י גודל...</a></li>
                                                                <li><hr class="dropdown-divider" /></li>

                                                                <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("קטן")}>{"קטן"}</a></li>
                                                                <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("בינוני")}>{"בינוני"}</a></li>
                                                                <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("גדול")}>{"גדול"}</a></li>
                                                                {/* how to catch the value of the the dropdown? should we use yup?*/}
                                                                {/* how to set dropdown going down instead of up> */}
                                                                {/* to implement the fixxed dropdonw in the 2 other forms */}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                                <button type="submit" className="btn btn-primary ms-3" >שליחה</button>

                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className='new-mission'>
                <Modal modalButtonName={"הוספת משימה חדשה"} btnType="success" footer={true} size="medium" title="הוספת משימה חדשה">
                    <input required={true} type={"text"} dir="rtl" placeholder="סוג משימה :" /><p />
                    <hr /><label>תאריך סיום </label> <br />
                    <input required={true} type={"date"} /><p /><hr />
                    <label>תמונה </label> <br />
                    <input required={false} type={"file"} /><p /><hr />
                    <input required={true} type={"text"} dir="rtl" placeholder="שם העובד המבצע " /><p />
                    <input required={true} type={"submit"} /><p />
                </Modal>
            </div>
        </div>
    )
}

export default GeneralBody