import "./RegisterInspector.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { updateUserData } from "../../redux/slicers/UserSlice";
// import { publicRequest } from "../../requestMethods";
import { useState } from "react";
import axios from 'axios';

const RegisterInspector = () => {
    // const navigate = useNavigate();
    let windoWidth = window.innerWidth;
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")

    const schema = Yup.object().shape({
        firstName: Yup.string().required("Please enter your first name"),
        lastName: Yup.string().required("Please enter your last name"),
        email: Yup.string().email().required("Please enter an email"),
        phone: Yup.string().min(10).max(10, 'Too match digits'),
        password: Yup.string()
        .required("Please enter a password")
        .min(8, "Must Contain 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[0-9])/,
            "Must Contain one Lowercase letter and a Number"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    const createUser = (body) => {
        const {firstName, lastName, email, password} = body
        const sendbody = {
            firstName,
            lastName,
            email,
            password
            }
            axios.post(`${process.env.REACT_APP_SECRET_NAME_BACKEND_URL}/api/registerInspector`, sendbody)
            .then((res) => {
                    setAlert(res.data.error)
                    setMessage(res.data.message)
                    const {avatar, email, firstName, lastName, password, _id } = res.data.userData
                    const accessToken = res.data.accessToken
                    const values = {
                            avatar,
                            email,
                            firstName,
                            lastName,
                            password,
                            accessToken,
                            _id,
                            loggedIn: true
                        }
                     
                    
                    // return navigate("/");
            })
            .catch((err) => (err));
    };
    // const dispatch = useDispatch();

    return (
        <div className="signup-page-container">
            <div className="signup-background"></div>
            <div className="add-another-container">
            {alert && (
                <div className="alert alert-danger invalid-login-alert" role="alert" hidden={!alert}>
                    {message}
                </div>
            )}
                <div className="sign-up-container">
                    <div className="sign-up ">
                        <h1 className="mb-4 pb-2 mt-5 color-white">הרשמה</h1>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }}
                            validationSchema={schema}
                            onSubmit={(values) => createUser(values)}
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
                                    <div className="row">
                                        <div className="form-floating sign-up-input mb-2 col ">
                                            <input
                                                name="firstName"
                                                type="text"
                                                className="form-control shadow input-register"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.firstName}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable input-register" rtl>שם פרטי</label>
                                            <p className="error-message">{errors.firstName && touched.firstName && errors.firstName}</p>
                                        </div>
                                        <div className="form-floating mb-2 col">
                                            <input
                                                name="lastName"
                                                type="text"
                                                className="form-control shadow input-register"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.lastName}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable input-register">שם משפחה</label>
                                            <p className="error-message">{errors.lastName && touched.lastName && errors.lastName}</p>
                                        </div>
                                    </div>
                                    {windoWidth <= 500 ? 
                                    <>
                                        <div className="row">
                                            <div className="form-floating email-input col">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control shadow input-register"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    onBlur={handleBlur}
                                                />
                                                <label className="ms-3 input-lable input-register">כתובת אימייל</label>
                                                <p className="error-message">{errors.email && touched.email && errors.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="form-floating mb-2 col ">
                                                <input
                                                    name="phone"
                                                    type="text"
                                                    className="form-control shadow input-register"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    
                                                />
                                                <label className="ms-3 input-lable input-register" >מספר פלאפון</label>
                                                <p className="error-message">{errors.phone && touched.phone && errors.phone}</p>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                    <div className="row">
                                        <div className="form-floating mb-2 col-6">
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">כתובת אימייל</label>
                                            <p className="error-message">{errors.email && touched.email && errors.email}</p>
                                        </div>
                                        
                                        <div className="form-floating mb-2 col">
                                            <input
                                                name="phone"
                                                type="text"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">מספר פלאפון</label>
                                            <p className="error-message">{errors.phone && touched.phone && errors.phone}</p>
                                        </div>
                                    </div>
                                </>
                                }
                                    <div className="row">
                                        <div className="form-floating mb-2 col">
                                            <input
                                                name="password"
                                                type="password"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.password}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">סיסמה</label>
                                            <p className="error-message">{errors.password && touched.password && errors.password}</p>
                                        </div>
                                    </div> 
                                    <div className="row">
                                        <div className="form-floating col">
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.confirmPassword}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">אשר סיסמה</label>
                                            <p className="error-message">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                                        </div>
                                    </div> 
                                    <button type="submit" className="btn btn-primary my-4 signup-button">
                                        הרשמה
                                    </button>
                                </form>
                            )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterInspector