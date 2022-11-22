import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import './newDogForm.css'
// import Alert from '../../alert/Alert';
import { publicRequest } from '../../../requestMethods';
import { useDispatch } from 'react-redux';
import { addEventWhenAddDog, getDogs } from '../../../utils/apiCalls';



export default function NewDogForm({addEventApivs}) {
    const [dogSize, setDogSize] = useState("")
    const [dogImage, setDogImage] = useState("")
    const [dogSex, setDogSex] = useState("")
    const [dogAge, setDogAge] = useState("")
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
    });

    const handleSubmition = (values) => {
        const currentDate = new Date()

        const treatment = []
        const treatmentData = {
            type: "אחר",
            treatmentName: "טיפול ראשוני",
            treatmentDate: {
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
            },
            description: values.treatment
        }
        const vaccineData = {
            type: "חיסון",
            treatmentName: values.vaccineName,
            treatmentDate: {
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
            },
            amount: values.vaccineAmount,
            description: values.vaccineDescription
        }
        const drugData = {
            type: "תרופה",
            treatmentName: values.drugName,
            treatmentDate: {
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
            },
            amount: values.drugAmount,
            description: values.drugDescription
        }
        if(values.treatment){
            treatment.push(treatmentData)
        }
        if(vaccine) {
            treatment.push(vaccineData)
        }
        if(drug) {
            treatment.push(drugData)
        }
        const value = {
            details: {
                dogName: values.dogName,
                weight: values.dogWeight,
                age: dogAge,
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
            },
            treatment: treatment
        };
        addNewEvent(values)
        createDog(value);
    }
    const addNewEvent = (values) =>{
        let date = new Date();
        date.setDate(date.getDate() + 14);
        
        const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
       const nowTime=`${date.getFullYear()}-${padL(date.getMonth()+1)}-${padL(date.getDate())}T${padL(date.getHours())}:${padL(date.getMinutes())}:${padL(date.getSeconds())}.000Z`


       const endTime=`${date.getFullYear()}-${padL(date.getMonth()+1)}-${padL(date.getDate())}T${padL(date.getHours()+1)}:${padL(date.getMinutes())}:${padL(date.getSeconds())}.000Z`

        const newEvent={
            title:`${values.chipNumber} :מספר שבב  ${values.dogName}להוציא את `,
            start:nowTime,
            end:endTime,
            describe:""
        }
        console.log(newEvent);
        addEventWhenAddDog(dispatch,newEvent)
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
                res.data && getDogs(dispatch);
            })

    }

    const dispatch = useDispatch()
    return (
        <div className='petform-footer-container'>
            <div className='form-contact-container'>
                <div className="form-container">
                    <Formik
                        initialValues={{
                            dogName: "",
                            dogWeight: "",
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
                                {/* <Alert alertType={"success"} alert={success}>
                                    הטופס נשלח הצלחה
                                </Alert>
                                <Alert alertType={"danger"} alert={fail} >
                                    שגיאה בשליחת הטופס
                                </Alert> */}
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
                                    </div>
                                    <div className="form-floating">
                                        <textarea name='treatment' className="form-control" id="floatingInput" rows="3" placeholder="טיפול שניתן לכלב" onChange={handleChange} value={values.treatment} onBlur={handleBlur}></textarea>
                                        <label dir='rtl' for="floatingInput" className="form-label">טיפול שניתן לכלב*</label>
                                        <p className="error-message">{errors.treatment && touched.treatment && errors.treatment}</p>
                                    </div>
                                    <div className='form-container-page1-third row mt-4 mb-4 ms-4' >
                                        <div className='checkbox-container col-sm-6 ps-0'>
                                            <input className="form-check-input mt-0 " type="checkbox" value="" aria-label="Checkbox for following text input" onClick={() => setDrug(!drug)} />
                                            <p dir='rtl' className='mb-1 me-1 opened-input'>קיבל תרופה?</p>
                                            <input name="drugName" type="text" className="form-control " placeholder="שם תרופה" aria-label="Example text with button addon" onChange={handleChange}  aria-describedby="button-addon1" hidden={!drug} />
                                        </div>
                                        <div className='checkbox-container col-sm-6 ps-0'>
                                            <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onClick={() => setVaccine(!vaccine)} />
                                            <p dir='rtl' className='mb-1 me-1 opened-input'>קיבל חיסון?</p>
                                            <input name="vaccineName" type="text" id="floatingInput" className="form-control " placeholder="שם חיסון" aria-label="Example text with button addon" onChange={handleChange}  aria-describedby="button-addon1" hidden={!vaccine} />
                                        </div>
                                    </div>
                                    <div className='form-container-page1-third row mt-4 mb-4 ms-4' >
                                        <div className='checkbox-container col-sm-6 ps-0'>
                                            <input name="drugAmount" type="text" className="form-control ms-3" placeholder="כמות" aria-label="Example text with button addon" onChange={handleChange}  aria-describedby="button-addon1" hidden={!drug} />
                                            <input name="drugDescription" type="text" className="form-control " placeholder="פירוט" aria-label="Example text with button addon" onChange={handleChange}  aria-describedby="button-addon1" hidden={!drug} />
                                        </div>
                                        <div className='checkbox-container col-sm-6 ps-0'>
                                            <input name="vaccineAmount" type="text" className="form-control ms-3" placeholder="כמות" aria-label="Example text with button addon" onChange={handleChange}  aria-describedby="button-addon1" hidden={!vaccine} />
                                            <input name="vaccineDescription" type="text" className="form-control " placeholder="פירוט" aria-label="Example text with button addon" onChange={handleChange}  aria-describedby="button-addon1" hidden={!vaccine} />
                                        </div>
                                    </div>
                                    <div className='form-container-page1-fourth row'>
                                        <div className="dropdown col-sm">
                                            <div className="input-group mb-3 me-5">
                                                <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSex ? dogSex : "מין החיה"}</button>
                                                <ul className="dropdown-menu scrollable-menu">
                                                    <li><a href='#sex' class="dropdown-item" dir='rtl' >בחר/י מין...</a></li>
                                                    <li><hr class="dropdown-divider" /></li>

                                                    <li><a href='#male' className="dropdown-item" dir='rtl' onClick={() => setDogSex("זכר")}>{"זכר"}</a></li>
                                                    <li><a href='#female' className="dropdown-item" dir='rtl' onClick={() => setDogSex("נקבה")}>{"נקבה"}</a></li>
                                                    {/* how to catch the value of the the dropdown? should we use yup?*/}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="dropdown col-sm">
                                            <div className="input-group mb-3 me-5">
                                                <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSize ? dogSize : "גודל הכלב"}</button>
                                                <ul className="dropdown-menu scrollable-menu">
                                                    <li><a href='#size' class="dropdown-item" dir='rtl' >בחר/י גודל...</a></li>
                                                    <li><hr class="dropdown-divider" /></li>

                                                    <li><a href="#small "className="dropdown-item" dir='rtl' onClick={() => setDogSize("קטן/ה")}>{"קטן/ה"}</a></li>
                                                    <li><a href='#medium' className="dropdown-item" dir='rtl' onClick={() => setDogSize("בינוני/ת")}>{"בינוני/ת"}</a></li>
                                                    <li><a href='#large' className="dropdown-item" dir='rtl' onClick={() => setDogSize("גדול/ה")}>{"גדול/ה"}</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="dropdown col-sm">
                                            <div className="input-group mb-3 me-5">
                                                <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogAge ? dogAge : "גיל הכלב"}</button>
                                                <ul className="dropdown-menu scrollable-menu">
                                                    <li><a href='#large' class="dropdown-item" dir='rtl' >בחר/י גיל...</a></li>
                                                    <li><hr class="dropdown-divider" /></li>

                                                    <li><a href='#aboveYear' className="dropdown-item" dir='rtl' onClick={() => setDogAge("מעל שנה")}>{"מעל שנה"}</a></li>
                                                    <li><a href='#belowYear' className="dropdown-item" dir='rtl' onClick={() => setDogAge("עד שנה")}>{"עד שנה"}</a></li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='form-container-page1-fifth row'>
                                        <div className="input-group mb-3 col-sm-3 ">
                                            <input name="picture" type="file" className="form-control" id="inputGroupFile01" placeholder="העלאה" onChange={(e) => {
                                                // onSelectfile(e)
                                                handleProductImageUpload(e)
                                            }}
                                                value={values.picture} 
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
