import './lostForm.css'
import { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
////////socket
import io from 'socket.io-client'
import Alert from '../alert/Alert';
import neighborhoods from '../Area';

const socket = io.connect("http://localhost:3001")
///////
const LostForm = ({ }) => {

    const [page, setPage] = useState(0)
    const [productImage, setProductImage] = useState("")
    const [submited, setSubmited] = useState(false)
    const [dogSize, setDogSize] = useState("")
    const [area, setArea] = useState("")
    const [filteredList, setFilteredList] = useState(neighborhoods);
    const [violent, setViolent] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")


    const [selectedImage, setSelectedImage] = useState([])
    const schema = Yup.object().shape({
        fullName: Yup.string()
            .required("נא להכניס שם מלא"),
        phone: Yup.string()
            .required("נא להכניס מספר פלאפון")
            .min(10, "מספר טלפון מכיל בדיוק 10 ספרות")
            .max(10, "מספר טלפון מכיל בדיוק 10 ספרות")
            .matches(/[0-9]/, "מספר פלאפון מכיל מספרים בלבד"),
        details: Yup.string()
            .required(" נא להכניס את פרטי הדיווח").max(105, 'דיווח עד 105 תווים')
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
                size: dogSize,
                color: values.color,
                violent: violent,
            },

            location: {
                neighborhood: area,
                street: values.street
            },
            reportDetails: {
                time: {
                    date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
                    hour: `${currentDate.getHours()}:${currentDate.getMinutes()}`
                },
                details: values.details,
                picture: productImage,
            },
            lost: true
        };
        postReport(value)
    };

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0]
        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader()

        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProductImage(reader.result)
            }
        } else {
            setProductImage("")
        }
    }
    const onSelectfile = (e) => {
        const selectedFile = e.target.files
        const selectedFileArray = Array.from(selectedFile)

        const imageArray = selectedFileArray.map((file) => {
            return URL.createObjectURL(file)
        })
        // setSelectedImage(imageArray)
    }

    const postReport = (report) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/reports`, report)
            .then((res) => {
                res.data && setAlert(res.data.error)
                res.data && setAlertMessage(res.data.message)
                res.data && setAlertType(res.data.alertType)
                console.log(report);
                sendM(report, room);
            })
    }

    ////////////socket

    const [messageRecived, setMessageRecived] = useState("")
    const [room, setRoom] = useState("1")
    const sendM = (message, room) => {
        socket.emit("send_msg", { message, room })

    }
    ////join room
    (() => {
        if (room !== "") {
            socket.emit("join_room", room)
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
    }, [])
    return (
        <div className='lostForm-footer-container'>
            <div className='form-contact-container'>
                <div className="form-container">
                    <Formik
                        initialValues={{
                            fullName: "",
                            email: "",
                            phone: "",
                            details: "",
                            color: "",
                            street: "",
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
                                <Alert alertType={alertType} alert={alert} setAlert={setAlert} >
                                    {alertMessage}
                                </Alert>
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

                                        </div>
                                        <div className="form-floating col-sm">
                                            <input name="phone" type="text" className="form-control" id="floatingInput" placeholder="מספר נייד" onChange={handleChange} value={values.phone} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">מספר נייד*</label>
                                            <p className="error-message">{errors.phone && touched.phone && errors.phone}</p>
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <textarea name='details' className="form-control" id="floatingInput" rows="3" placeholder="תוכן הפנייה" onChange={handleChange} value={values.details} onBlur={handleBlur}></textarea>
                                        <label dir='rtl' for="floatingInput" className="form-label">תוכן הפנייה*</label>
                                        <p className="error-message">{errors.details && touched.details && errors.details}</p>
                                    </div>
                                    <div className='form-container-page1-third row'>
                                        <div className="form-floating col-sm-4">
                                            <input name="color" type="text" className="form-control" id="floatingInput" placeholder="צבע" onChange={handleChange} value={values.color} onBlur={handleBlur} />
                                            <label dir='rtl' for="floatingInput" className="form-label">צבע</label>
                                            {/* <p className="error-message">{errors.color && touched.color && errors.color}</p> */}
                                        </div>

                                        <div className="form-container-page1-third-dogSize dropdown col-sm-4">
                                            <div className="input-group mb-3 dropdown-size">
                                                <div className=' dropdown-size-title'>
                                                    <p>גודל הכלב</p>
                                                </div>
                                                <div className=' dropdown-size-btn'>

                                                    <button dir='rtl' className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{dogSize ? dogSize : "בחירת גודל"}</button>
                                                    <ul className="dropdown-menu scrollable-menu ">
                                                        <li><a class="dropdown-item" dir='rtl' >בחר/י גודל...</a></li>
                                                        <li><hr class="dropdown-divider" /></li>

                                                        <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("קטן")}>{"קטן"}</a></li>
                                                        <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("בינוני")}>{"בינוני"}</a></li>
                                                        <li><a className="dropdown-item" dir='rtl' onClick={() => setDogSize("גדול")}>{"גדול"}</a></li>
                                                        {/* how to catch the value of the the dropdown? should we use yup?*/}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="button" className="btn btn-primary mt-4" onClick={() => { setPage(page + 1) }}>הבא</button>
                                    <div className='must-asterisk mt-4' dir='rtl'>שדות חובה מסומנים ב*</div>

                                    {/* page 2 */}
                                </div>
                                    : <div className='form-container-page2'>
                                        <div className='form-container-page2-first row'>
                                            <div className='input-title-container col-sm-4'>
                                                <p dir='rtl'> שכונה</p>
                                                <div className="dropdown">
                                                    <div className="input-group mb-3">
                                                        <button dir='rtl' className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{area ? area : "בחירת שכונה"}</button>
                                                        <ul className="dropdown-menu scrollable-menu">
                                                            <li><a class="dropdown-item" dir='rtl' >בחר/י שכונה...</a></li>
                                                            <li><hr class="dropdown-divider" /></li>
                                                            {filteredList.map((t, index) =>
                                                                <li key={index}><a className="dropdown-item" dir='rtl' onClick={() => setArea(t)}>{t}</a></li>
                                                            )}
                                                        </ul>
                                                        {/* <input type="text" className="s" aria-label="Text input with dropdown button" onChange={filterBySearch} /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='input-title-container col-sm-4'>
                                                {/* <p dir='rtl'> רחוב ומספר בית*</p> */}
                                                <div className="form-floating col">
                                                    <input name="street" type="text" className="form-control" id="floatingInput" placeholder="מיקום" onChange={handleChange} value={values.street} onBlur={handleBlur} />
                                                    <label dir='rtl' for="floatingInput" className="form-label">רחוב ומספר בית</label>
                                                    {/* <p className="error-message">{errors.street && touched.street && errors.street}</p> */}
                                                </div>
                                            </div>
                                            <div className='radio-btns-container col-sm'>
                                                <div className='radio-btns-container-tittle me-10 '>
                                                    <p dir='rtl'>חיה אלימה/תוקפנית</p>
                                                </div>

                                                <div className='radio-btns-container-btns ms-6'>
                                                    <div className="form-check form-check-inline">
                                                        <input name="violent" className="form-check-input" type="radio" id="inlineRadio1" placeholder="לא" onChange={handleChange} onClick={() => setViolent(!violent)} value={"לא"} />
                                                        <label dir='rtl' className="form-check-label" for="inlineRadio1">לא</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input name="violent" className="form-check-input" type="radio" id="inlineRadio2" placeholder="כן" onChange={handleChange} onClick={() => setViolent(!violent)} value={"כן"} />
                                                        <label dir='rtl' className="form-check-label" for="inlineRadio2">כן</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-container-page1-second row'>
                                            <div className='input-title-container'>
                                                <p dir='rtl'>העלאת תמונה</p>
                                            </div>
                                            <div className="input-group mb-3 col-sm-3 ">
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

                                        {/* <div className="form-floating">
                                            <textarea name='extraDetails' className="form-control" id="floatingInput" rows="3" placeholder="הערות" onChange={handleChange} value={values.extraDetails} onBlur={handleBlur}></textarea>
                                            <label dir='rtl' for="floatingInput" className="form-label">הערות</label>
                                        </div> */}
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