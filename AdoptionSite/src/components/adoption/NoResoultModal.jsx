import { Formik } from "formik"
import "./modaldog.css"
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import * as Yup from "yup";
import axios from 'axios'



const NoResoultModal = ({age, size, gender, name}) => {
    
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

    const [alert, setAlert] = useState(false)
    const [dogsOpenForAdoption, setDogsOpenForAdoption] = useState("")
      
    const {REACT_APP_SERVER_URL} = process.env;

    const form = useRef();
    const sendEmail = () => {
        emailjs.sendForm('service_fexworp', 'template_i6lbmm8', form.current, 'a-l6-BOufBazyXFlh')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    
    const [reqGender, setReqGender] = useState("");
    const [reqAge, setReqAge] = useState("");
    const [reqSize, setReqSize] = useState("");

    const sendData = (FullName, userEmail, Phone) => {
        const data = { 
            fullName: FullName,
            email: userEmail,
            phone: Phone,
            gender: reqGender, 
            age: reqAge, 
            size: reqSize, 
        };
          axios
            .post(`${REACT_APP_SERVER_URL}/api/dogRequests`, data)
            .catch((err) => console.log(err));
      };

  

    const getDogs = () => {
        axios.get(`${REACT_APP_SERVER_URL}/api/dogs`)
            .then((res) => {
                if (res.data) {
                    let val = searchFordog(res.data)
                    let amount = val.length.toString()
                    setDogsOpenForAdoption(amount);
                    return(amount); 
                } 
            })
            .catch((err) => console.log(err));
    }

    const searchFordog = (dogs) => {
        return(
            dogs.filter((val) => {
                if (val.adopted === false){
                    if(reqGender === ""){
                        return val;
                    }else if(val.gender.includes(reqGender)){
                        return val;
                    }else return null
                }else return null
            }).filter((val) => {
                if(reqAge === ""){
                    return val;
                }else if(val.age.includes(reqAge)){
                    return val;
                }else return null
            }).filter((val) => {
                if(reqSize === ""){
                    return val;
                }else if(val.size.includes(reqSize)){
                    return val;
                }else return null
            })
        )
    } 

    const handleSubmition = (values) => {
        sendData(values.fullName, values.email, values.phone)
        getDogs()
        setAlert(true)
        }
  
      const [open, setOpen] = useState(false)
      const handleOpen = () => {setOpen(true)}
      const handleClose = () => {setOpen(false)}
  
      return(
          <div className='modal-container '>
              <button onClick={() => handleOpen()} type="button" className="btn btn-primary">
              {name}
              </button>
          { open &&
              <div className='modal-background '>
                  <div className='modal-fade-container'>
                      <div className='modal-title-contianer modal-header'>
                          <h5 className="modal-title left-to-right" id="exampleModalLabel">הזינו את פרטיכם</h5>
                          <button onClick={() => handleClose()} type="button" className="btn-close"/>
                      </div>
                      <div className='add-overflow'>
                          <div className='modal-body-contianer'>
                            <div className="modal-details-container ">
                                <button className="btn btn-secondary dropdown-toggle modal-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {reqGender ? reqGender: "מין" }
                                </button>
                                <ul className="dropdown-menu">
                                    <li  onClick={() => {setReqGender("זכר")}}><button className="dropdown-item" href="#">זכר</button></li>
                                    <li  onClick={() => {setReqGender("נקבה")}}><button className="dropdown-item" href="#">נקבה</button></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li  onClick={() => {setReqGender("")}}><button className="dropdown-item" href="#">הכל</button></li>
                                </ul>
                                <button className="btn btn-secondary dropdown-toggle modal-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {reqAge ? reqAge : "גיל"} 
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={() => {setReqAge("עד שנה")}}><button className="dropdown-item" href="#">עד שנה</button></li>
                                    <li onClick={() => {setReqAge("מעל שנה")}}><button className="dropdown-item" href="#">מעל שנה</button></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li onClick={() => {setReqAge("")}}><button className="dropdown-item" href="#">הכל</button></li>
                                </ul>
                                <button className="btn btn-secondary dropdown-toggle modal-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {reqSize ? reqSize: "גודל"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={() => {setReqSize("גדול/ה")}}><button className="dropdown-item" href="#">גדול/ה</button></li>
                                    <li onClick={() => {setReqSize("בינוני/ת")}}><button className="dropdown-item" href="#">בינוני/ת</button></li>
                                    <li onClick={() => {setReqSize("קטן/ה")}}><button className="dropdown-item" href="#">קטן/ה</button></li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li onClick={() => {setReqSize("")}}><button className="dropdown-item" href="#">הכל</button></li>
                                </ul>
                            </div>
                              <Formik
                                initialValues={{
                                    fullName: "",
                                    email: "",
                                    phone: ""
                                }}
                                onSubmit={(values) => {
                                    handleSubmition(values)
                                    sendEmail()
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
                                      <div className="form-floating mb-3 right-to-left">
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
                                          <textarea type="text" className="form-control" id="floatingInput" placeholder="הודעה אישית*"/>
                                          <label for="floatingInput">הודעה אישית*</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary mb-4 right-to-left">שליחה</button>
                                  </form>
                                  )}
                              </Formik>
                                {dogsOpenForAdoption === "0" ? 
                                    <div className="alert-container">
                                        <div class="alert alert-success right-to-left save-spot-alert"  role="alert" hidden={!alert}>
                                            <p className="m-0">{"הנתונים נקלטו במאגר שלנו, נחזור אליך ברגע שנמצא התאמה"}  </p>
                                        </div> 
                                    </div> :
                                    <div className="alert-container"> 
                                        <div class="alert alert-danger save-spot-alert" role="alert" hidden={!alert}>
                                            <p className="m-0">{"נמצאו " + dogsOpenForAdoption + " התאמות"}  </p>
                                        </div>
                                    </div>
                                    }
                          </div>
                      </div>
                      <div className='modal-footer-contianer modal-footer'>
                          <button onClick={() => handleClose()} type="button" className="btn btn-secondary close-btn right-to-left">סגור</button>
                      </div>
                  </div>
              </div>
              }
          </div>  
    )
}

export default NoResoultModal