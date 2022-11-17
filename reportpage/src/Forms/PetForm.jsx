import './petForm.css'
import { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
////////socket
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")
///////
const PetForm = ({ }) => {

    const [page, setPage] = useState(0)
    const [productImage, setProductImage] = useState("")
    const [submited, setSubmited] = useState(false)
    const [selectedImage, setSelectedImage] = useState([])
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
            type: Yup.string()
                .required("נא להכניס את סוג החיה"),
            place: Yup.string()
                .required("נא להכניס את מיקום הדיווח"),
        });
    const handleSubmition = (values) => {
        const currentDate = new Date()
        const value = {
            reporterDetails: {
                fullName: values.fullName,
                email: values.email,
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
                time: {
                    date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                    hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
                },
                details: values.details,
                picture: productImage,
            },
        };
        postReport(value)
    };

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0]
        transformFile(file)
    }

    const transformFile = (file) => {
      const reader = new FileReader()

      if(file){
          reader.readAsDataURL(file)
          reader.onloadend = () => {
              setProductImage(reader.result)
          }
      }else{
          setProductImage("")
      }
    }
    const onSelectfile = (e) => {
        const selectedFile = e.target.files
        const selectedFileArray = Array.from(selectedFile)

        const imageArray = selectedFileArray.map((file) => {
            return URL.createObjectURL(file)
        })
        setSelectedImage(imageArray)
    }

    const postReport = (report) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/reports`, report)
        .then(()=>{
            console.log(report);
            sendM(report,room);
        })
    }

  ////////////socket
  
  const [messageRecived,setMessageRecived]=useState("")
  const [room,setRoom]=useState("1")
  const sendM =(message, room)=>{
    socket.emit("send_msg",{message,room})
    
  }
  ////join room
  (()=>{
    if (room!=="") {
      socket.emit("join_room",room)
      console.log("connected");
    }
    
  })()
  
  ///////////////////////
  useEffect(() => {
    // joinRoom()
    if (submited !== false) {
      alert("הדיווח נשלח")
      // sendM(state, room)
      setSubmited(true)
      
    }
  //   socket.on("recive_msg",(data)=>{
  //     setMessageRecived(data.message)
  // })
},[])
    return (
        <div className='petform-footer-container'>
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
                            location: "",
                            violent: "",
                            extraDetails: "",
                        }}
                        onSubmit={(values) => handleSubmition(values)}
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

                                    <button type="button" className="btn btn-primary" onClick={() => {setPage(page + 1)}}>הבא</button>
                                    <div className='must-asterisk mt-4' dir='rtl'>שדות חובה מסומנים ב*</div>

                                    {/* page 2 */}
                                </div> 
                                : <div className='form-container-page2'>
                                    <div className='form-container-page2-first row'>
                                        <div className='input-title-container'>
                                            <p dir='rtl'>זמן הדיווח*</p>
                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="place" type="text" className="form-control" id="floatingInput" placeholder="מיקום" onChange={handleChange} value={values.place} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">מיקום (שכונה, רחוב, מספר בית)*</label>
                                            <p className="error-message">{errors.place && touched.place && errors.place}</p>
                                        </div>
                                    </div>
                                    <div className='form-container-page1-fouth row'>
                                        <div className='radio-btns-container col-sm'>
                                            <div className='input-title-container'>
                                                <p dir='rtl'>חיה אלימה/תוקפנית</p>
                                            </div>
                                            <div className="form-check form-check-inline ">
                                                <input name="violent" className="form-check-input" type="radio" id="inlineRadio1" placeholder="לא" onChange={handleChange} value={"לא"} />
                                                <label dir='rtl' className="form-check-label" for="inlineRadio1">לא</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input name="violent" className="form-check-input" type="radio" id="inlineRadio2" placeholder="כן" onChange={handleChange} value={"כן"} />
                                                <label dir='rtl' className="form-check-label" for="inlineRadio2">כן</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='input-title-container'>
                                        <p dir='rtl'>העלאת תמונה</p>
                                    </div>
                                    <div className="input-group mb-3 ">
                                        {/* <label dir='rtl' className="input-group-text" for="inputGroupFile01">בחרו קובץ</label> */}
                                        <input name="picture" type="file" className="form-control" id="inputGroupFile01" placeholder="העלאה" onChange={(e) => {
                                                // onSelectfile(e)
                                                handleProductImageUpload(e)
                                                }}  
                                                // value={values.picture} 
                                                onBlur={handleBlur} 
                                                />
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
export default PetForm