import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import './newDogForm.css'
import Alert from '../../alert/Alert';
import { publicRequest } from '../../../requestMethods';



export default function NewDogForm() {
    const [dogSize, setDogSize] = useState("")
    const [dogImage, setDogImage] = useState("")
    const [dogSex, setDogSex] = useState("")
    const [drug, setDrug] = useState(false)
    const [vaccine, setVaccine] = useState(false)
    const [success, setSuccess] = useState(false)
    const [fail, serFail] = useState(false)
    // const [submited, setSubmited] = useState(false)
    // let windowWidth = window.innerWidth;
    const schema = Yup.object().shape({
        dogName: Yup.string()
            .required("נא להכניס את שם הכלב"),
        dogWeight: Yup.string()
            .required("נא להכניס את משקל הכלב"),
        dogAge: Yup.string()
            .required("נא לכניס את גיל הכלב"),
        treatment: Yup.string()
            .required("נא להכניס את הטיפול הניתן לכלב"),
        // dogSize: Yup.string()
        //     .required("נא להכניס את גודל הכלב")
    });
    // const pet  = Yup.object().shape({

    // });

    const handleSubmition = (values) => {
        const currentDate = new Date()
        const value = {
            details: {
                dogName: values.dogName,
                weight: values.dogWeight,
                age: values.dogAge,
                gender: dogSex,
                size: dogSize,
                chipNumber: values.chipNumber,
                src: dogImage
            },
            dates: {
                initialDate: {
                    date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                    hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
                }
            }
        };

        createDog(value);
    }

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0]
        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader()

        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setDogImage(reader.result)
            }
        } else {
            setDogImage("")
        }
    }

    const createDog = (body) => {
        publicRequest.post(`/api/dogs/`, body)
            .then((res) => {
                res.data && console.log(res.data);
            })

    }


    // router.post('/register', async function (req, res, next) {
    //     const { userName, firstName, LastName, password } = req.body
    //     const userExists = await Users.findOne({ userName });

    //     if (!userExists) {
    //         const users = {
    //             userName,
    //             firstName,
    //             LastName,
    //             password
    //         }
    //         Users.create(users).then(() => {
    //             res.json({
    //                 "error": false,
    //                 "message": "user registered successfully"
    //             })
    //         }).catch(err => {
    //             res.json({
    //                 "error": true,
    //                 "message": "couldn't register user",
    //                 "m": err

    //             })
    //         })

    //     } else {
    //         res.json({
    //             "error": true,
    //             "message": "user already registered"
    //         })
    //     }
    //     }


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
    return (
        <div className='petform-footer-container'>
            <div className='form-contact-container'>
                <div className="form-container">
                    <Formik
                        initialValues={{
                            dogName: "",
                            dogWeight: "",
                            dogAge: "",
                            gender: "",
                            treatment: "",
                            dogSize: "",
                            chipNumber: ""
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
                                <Alert alertType={"success"} alert={success}>
                                    הטופס נשלח הצלחה
                                </Alert>
                                <Alert alertType={"danger"} alert={fail}>
                                    שגיאה בשליחת הטופס
                                </Alert>
                                <div className='form-container-page1'>
                                    <div className='form-container-page1-first row'>
                                        <div className="form-floating col-sm">
                                            <input name="dogName" type="text" className="form-control" id="floatingInput" placeholder="שם הכלב" onChange={handleChange} value={values.dogName} onBlur={handleBlur} />
                                            <label dir='rtl' htmlFor="floatingInput" className="form-label">שם הכלב*</label>
                                            <p className="error-message">{errors.dogName && touched.dogName && errors.dogName}</p>
                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="chipNumber" type="text" className="form-control" id="floatingInput" placeholder="שם הכלב" onChange={handleChange} value={values.chipNumber} onBlur={handleBlur} />
                                            <label dir='rtl' htmlFor="floatingInput" className="form-label">מספר צ׳יפ*</label>
                                            {/* <p className="error-message">{errors.chipNumber && touched.chipNumber && errors.chipNumber}</p> */}
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
                                        <textarea name='treatment' className="form-control" id="floatingInput" rows="3" placeholder="טיפול שניתן לכלב" onChange={handleChange} value={values.treatment} onBlur={handleBlur}></textarea>
                                        <label dir='rtl' for="floatingInput" className="form-label">טיפול שניתן לכלב*</label>
                                        <p className="error-message">{errors.treatment && touched.treatment && errors.treatment}</p>
                                    </div>
                                    <div className='form-container-page1-third row mt-4 mb-4 ms-4' >
                                        <div className='form-container-page1-third-checkbox-drug col-sm-2'>
                                            <p dir='rtl'>קיבל תרופה?</p>
                                            <input class="form-check-input mt-0 " type="checkbox" value="" aria-label="Checkbox for following text input" onClick={() => setDrug(!drug)} />
                                        </div>
                                        <div className='form-container-page1-third-checkbox-drug col-sm-3'>
                                            <input type="text" class="form-control input-sm" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" hidden={!drug} />
                                        </div>

                                        <div className='form-container-page1-third-checkbox-vaccine col-sm-2'>
                                            <p dir='rtl'>קיבל חיסון?</p>
                                            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onClick={() => setVaccine(!vaccine)} />
                                        </div>
                                        <div className='form-container-page1-third-checkbox-drug col-sm-3' >
                                            <input type="text" class="form-control input-sm" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" hidden={!vaccine} />
                                        </div>

                                    </div>
                                    <div className='form-container-page1-fourth row'>
                                        <div className="dropdown col-sm">
                                            <div className="input-group mb-3 me-5">
                                                <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSex ? dogSex : "מין החיה"}</button>
                                                <ul className="dropdown-menu scrollable-menu">
                                                    <li><a class="dropdown-item" dir='rtl' >בחר/י מין...</a></li>
                                                    <li><hr class="dropdown-divider" /></li>

                                                    <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSex("זכר")}>{"זכר"}</a></li>
                                                    <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSex("נקבה")}>{"נקבה"}</a></li>
                                                    {/* how to catch the value of the the dropdown? should we use yup?*/}
                                                </ul>
                                            </div>
                                        </div>
                                        {/* <div className="form-floating col-sm">
                                            <input name="gender" type="text" className="form-control" id="floatingInput" placeholder="מין החיה" onChange={handleChange} value={values.gender} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">מין החיה*</label>
                                            <p className="error-message">{errors.gender && touched.gender && errors.gender}</p>
                                        </div> */}

                                        {/* <div className="form-floating col-sm">
                                    <input name="dogSize" type="text" className="form-control" id="floatingInput" placeholder="גודל הכלב" onChange={handleChange} value={values.dogSize} onBlur={handleBlur} />
                                    <label dir='rtl' for="floatingInput" className="form-label">גודל הכלב*</label>
                                    <p className="error-message">{errors.dogSize && touched.dogSize && errors.dogSize}</p>
                                </div> */}

                                        <div className="dropdown col-sm">
                                            <div className="input-group mb-3 me-5">
                                                <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSize ? dogSize : "גודל הכלב"}</button>
                                                <ul className="dropdown-menu scrollable-menu">
                                                    <li><a class="dropdown-item" dir='rtl' >בחר/י גודל...</a></li>
                                                    <li><hr class="dropdown-divider" /></li>

                                                    <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("קטן/ה")}>{"קטן/ה"}</a></li>
                                                    <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("בינוני/ת")}>{"בינוני/ת"}</a></li>
                                                    <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("גדול/ה")}>{"גדול/ה"}</a></li>
                                                    {/* how to catch the value of the the dropdown? should we use yup?*/}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='form-container-page1-fifth row'>
                                        <div className="input-group mb-3 col-sm-3 ">
                                            <p dir='rtl'>העלאתתמונה</p>
                                            {/* <label dir='rtl' className="input-group-text" for="inputGroupFile01">בחרו קובץ</label> */}
                                            <input name="picture" type="file" className="form-control" id="inputGroupFile01" placeholder="העלאה" onChange={(e) => {
                                                // onSelectfile(e)
                                                handleProductImageUpload(e)
                                            }}
                                                // value={values.picture} 
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary ms-3 mb-4" >שליחה</button>
                                </div>
                                <button onClick={() => setSuccess(!success)}>הצלחה</button>
                                <button onClick={() => serFail(!fail)}>כשלון</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div >
    )
}
