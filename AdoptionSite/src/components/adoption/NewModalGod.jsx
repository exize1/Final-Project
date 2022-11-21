import './modaldog.css'
import { Formik } from "formik";
import * as Yup from "yup";
import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react';
import Alert from '../alert/Alert';
import axios from 'axios'

const NewDogModal = ({dog}) => {
    const schema = Yup.object().shape({
        fullName: Yup.string()
          .required("Pleasse enter your name"),
    
        email: Yup.string().email()
          .required("Pleasse enter a valid mail"),
    
        phone: Yup.string()
          .required("Pleasse enter your phone number")
          .min(10, "Phone number should containe 10 numbers exactly")
          .max(10, "Phone number should containe 10 numbers exactly")
          .matches(/[0-9]/, "phone number can contain numbers only."),
      });

    const [open, setOpen] = useState(false)
    const [alert, setAlert] = useState(false)
    const [error, setError] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [message, setMessage] = useState("")
    const {REACT_APP_SERVER_URL} = process.env;

    const sendData = (fullName, userEmail, phone, addedMessage) => {
        const currentDate = new Date()
        const data = { 
            fullName: fullName,
            email: userEmail,
            phone: phone,
            details:{
                gender: dog.details.gender, 
                age: dog.details.age, 
                size: dog.details.size 
            },
            isInDB: true,
            dogId: dog._id,
            addedMessage: addedMessage,
            dates: {
                date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
            }
        };
          axios
            .post(`${REACT_APP_SERVER_URL}/api/dogRequests`, data)
            .then((res) => {
                console.log(res.data);
                setMessage(res.data.message)
                setError(res.data.error)
                setAlert(true)
                setDisableButton(true)
                sendEmail()
            })
            .catch((err) => console.log(err));
      };
    const form = useRef();
    const sendEmail = () => {
        emailjs.sendForm('service_fexworp', 'template_qyvn527', form.current, 'a-l6-BOufBazyXFlh')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    const handleSubmition = (values) => {
        sendData(values.fullName, values.email, values.phone, values.addedMessage)
        setTimeout(() => {
            setAlert(false);
            setDisableButton(false)
        }, 2000);
  }

    const handleOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <div className='modal-container'>
            {dog.adopted === true ? 
                <button type="button" className="btn btn-primary adopted">אומצתי</button>  
            :
                <button onClick={() => handleOpen()} type="button" className="btn btn-primary on-me-btn"> אמצו אותי  </button>
            } 
        { open &&
            <div className='modal-background'>
                <div className='modal-fade-container'>
                    <div className='modal-title-container modal-header'>
                        <h5 className="modal-title" id="exampleModalLabel">הזינו פרטי קשר</h5>
                        <button onClick={() => handleClose()} type="button" className="btn-close"></button>
                    </div>
                    <div className='add-overflow'>
                        <div className='modal-body-container'>
                            <div className='modal-dog-img-container'>
                                <img  className='modal-dog-img' src={dog.details.src} alt="" />
                            </div>
                            <p className='right-to-left'>{dog.details.description}</p>
                            <h3 className='right-to-left'>רוצים לאמץ את {dog.details.dogName} ?</h3>
                            <p className='right-to-left'>מלאו את פרטיכם או התקשרו *4955</p>
                            <p className='right-to-left'>*אימוץ מתבצע על ידי בן משפחה בן 18 פלוס</p>
                            <Formik
                                initialValues={{
                                    fullName: "",
                                    email: "",
                                    phone: "",
                                }}
                                onSubmit={(values) => {
                                    sendEmail()
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

                                <form ref={form} onSubmit={handleSubmit} noValidate>
                                    <div className="form-floating mb-3  right-to-left">

                                        <input name="fullName" type="text" className="form-control" id="floatingInput" placeholder="שם ושם משפחה*" onChange={handleChange} value={values.fullName} onBlur={handleBlur}/>
                                        <label for="floatingInput">שם ושם משפחה*</label>
                                        <p className="error-message">{errors.fullName && touched.fullName && errors.fullName}</p>
                                    </div>
                                    <div className="form-floating mb-3 right-to-left">
                                        <input name="email" type="email" className="form-control" id="floatingInput" placeholder=">אימייל*" onChange={handleChange} value={values.email} onBlur={handleBlur} />
                                        <label for="floatingInput">אימייל*</label>
                                        <p className="error-message">{errors.email && touched.email && errors.email}</p>
                                    </div>
                                    <div className="form-floating mb-3 right-to-left">
                                        <input name="phone" type="text" className="form-control" id="floatingInput" placeholder="טלפון*" onChange={handleChange} value={values.phone} onBlur={handleBlur} />
                                        <label for="floatingInput">טלפון*</label>
                                        <p className="error-message">{errors.phone && touched.phone && errors.phone}</p>
                                    </div>
                                    <div className="form-floating mb-3 right-to-left">
                                        <textarea name="addedMessage" className="form-control" id="floatingInput" onChange={handleChange} value={values.addedMessage} placeholder="הודעה אישית"/>
                                        <label for="floatingInput">הודעה אישית</label>
                                    </div>
                                    <button type="submit" disabled={disableButton} className="btn btn-primary right-to-left mb-4">שליחה</button>
                                    <Alert alertType={"success"} alert={alert}>תודה שבחרתם לאמץ, נחזור אליכם בהקדם!</Alert>
                                </form>
                                )}
                            </Formik>
                                  
                        </div>
                    </div>
                    <div className='modal-footer-container modal-footer'>
                        <button onClick={() => handleClose()} type="button" className="btn btn-secondary close-btn">Close</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default NewDogModal
