import './lostForm.css'
import { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";

const LostForm = ({ }) => {
    const [page, setPage] = useState(0)
    let windowWidth = window.innerWidth;
    const schema = Yup.object().shape({
        fullName: Yup.string()
            .required("נא להכניס שם מלא"),
        email: Yup.string().email(),
        phone: Yup.string()
            .required("נא להכניס מספר פלאפון")
            .min(10, "Phone number should containe 10 numbers exactly")
            .max(10, "Phone number should containe 10 numbers exactly")
            .matches(/[0-9]/, "phone number can contain numbers only."),
        details: Yup.string()
            .required("נא להכניס את פרטי הדיווח"),
        size: Yup.string()
            .required("נא להכניס את גודל החיה"),
        color: Yup.string()
            .required("נא להכניס את צבע החיה"),
        place: Yup.string()
            .required("נא להכניס את מקום הדיווח"),
        time: Yup.string()
            .required("נא להכניס את זמן הדיווח"),
    });
    const handleSubmition = (values) => {
        const value = {
            reporterDetails: {
                email: values.email,
                fullName: values.fullName,
                phone: values.phone,
            },
            dogDetails: {
                size: values.size,
                color: values.color,
                violent: values.violent,
                
            },
            location: {
                place: values.place,

            },
            reportDetails: {
                details: values.details,
                picture: values.picture,
                time: values.time,
            },
            extraDetails: values.extraDetails,
        };
        console.log(values);
        // dispatch(update(value));
    };
    // const dispatch = useDispatch();
    return (
        <div className='footer-container'>
            <div className='form-contact-container'>
                <div className="form-container">
                    <Formik
                        initialValues={{
                            fullName: "",
                            email: "",
                            phone: "",
                            details: "",
                            size: "",
                            color: "",
                            picture: "",
                            place: "",
                            violent: "",
                            time: "",
                            extraDetails: "",
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
                                {/* page 1 */}
                                {page === 0 ? <div className='form-container-page1'>
                                    <div className='form-container-page1-first row'>
                                        <div className="form-floating col-sm">
                                            <input name="fullName" type="text" className="form-control" id="floatingInput" placeholder="שם מלא" onChange={handleChange} value={values.fullName} onBlur={handleBlur} />
                                            <label dir='rtl' htmlFor="floatingInput" className="form-label">שם מלא*</label>
                                            <p className="error-message">{errors.fullName && touched.fullName && errors.fullName}</p>
                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="email" type="email" className="form-control" id="floatingInput" placeholder="כתובת אי-מייל" onChange={handleChange} value={values.email} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label" >כתובת אי-מייל</label>
                                            <p className="error-message">{errors.email && touched.email && errors.email}</p>
                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="phone" type="text" className="form-control" id="floatingInput" placeholder="מספר נייד" onChange={handleChange} value={values.phone} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">מספר נייד*</label>
                                            <p className="error-message">{errors.phone && touched.phone && errors.phone}</p>
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <textarea name='details' className="form-control" id="floatingInput" rows="3" placeholder="תוכן הפנייה" onChange={handleChange} value={values.details} onBlur={handleBlur}></textarea>
                                        <label dir='rtl' for="floatingInput" className="form-label">תוכן הפנייה *</label>
                                        <p className="error-message">{errors.details && touched.details && errors.details}</p>
                                    </div>
                                    <div className='form-container-page1-second row'>
                                        <div className="form-floating col-sm">
                                            <input name="size" type="text" className="form-control" id="floatingInput" placeholder="גודל" onChange={handleChange} value={values.size} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">גודל החיה (קטן/בינוני/גדול)*</label>
                                            <p className="error-message">{errors.size && touched.size && errors.size}</p>
                                        </div>

                                        <div className="form-floating col-sm">
                                            <input name="color" type="text" className="form-control" id="floatingInput" placeholder="צבע" onChange={handleChange} value={values.color} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">צבע*</label>
                                            <p className="error-message">{errors.color && touched.color && errors.color}</p>
                                        </div>
                                    </div>
                                    <div className='radio-btns-container'>
                                        <div className='input-title-container'>
                                            <p dir='rtl'>חיה אלימה/תוקפנית</p>
                                        </div>

                                        <div className="form-check form-check-inline ">
                                            <input name="violent" className="form-check-input" type="radio" id="inlineRadio1" placeholder="לא" onChange={handleChange} value={values.violent} />
                                            <label dir='rtl' className="form-check-label" for="inlineRadio1">לא</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input name="violent" className="form-check-input" type="radio" id="inlineRadio2" placeholder="כן" onChange={handleChange} value={values.violent} />
                                            <label dir='rtl' className="form-check-label" for="inlineRadio2">כן</label>
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary mt-3" onClick={() => {
                                        setPage(page + 1)
                                    }}>הבא</button>
                                    <div className='must-asterisk mt-4' dir='rtl'>שדות חובה מסומנים ב*</div>
                                    {/* page 2 */}
                                </div> : <div className='form-container-page2'>
                                    <div className='form-container-page2-first row'>
                                        <div className='input-title-container'>
                                            <p dir='rtl'>זמן הדיווח*</p>
                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="time" type="date" className="form-control" id="floatingInput" placeholder="זמן הדיווח" onChange={handleChange} value={values.time} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label"></label>
                                            <p className="error-message">{errors.time && touched.time && errors.time}</p>
                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="place" type="text" className="form-control" id="floatingInput" placeholder="מיקום" onChange={handleChange} value={values.place} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">מיקום (שכונה, רחוב, מספר בית)*</label>
                                            <p className="error-message">{errors.place && touched.place && errors.place}</p>
                                        </div>
                                    </div>
                                    <div className='input-title-container'>
                                        <p dir='rtl'>העלאת תמונה</p>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        {/* <label dir='rtl' className="input-group-text" for="inputGroupFile01">בחרו קובץ</label> */}
                                        <input name="picture" type="file" className="form-control" id="inputGroupFile01" placeholder="העלאה" onChange={handleChange} value={values.picture} onBlur={handleBlur} />
                                    </div>

                                    <div className="form-floating">
                                        <textarea name='extraDetails' className="form-control" id="floatingInput" rows="3" placeholder="הערות" onChange={handleChange} value={values.extraDetails} onBlur={handleBlur}></textarea>
                                        <label dir='rtl' for="floatingInput" className="form-label">הערות</label>
                                    </div>
                                    <div className='form-container-page2-buttons mb-3'></div>
                                    <button type="button" className="btn btn-primary ms-3" onClick={() => {
                                        setPage(page - 1)
                                    }}>הקודם</button>
                                    <button type="submit" className="btn btn-primary ms-3" >שליחה</button>
                                    <br></br>
                                    <br></br>
                                    <div className='must-asterisk' dir='rtl'>שדות חובה מסומנים ב*</div>
                                </div>}
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
export default LostForm