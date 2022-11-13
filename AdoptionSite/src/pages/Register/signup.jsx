import "./signup.css"
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const SignUp = () => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")

    const schema = Yup.object().shape({
        firstName: Yup.string().required("Please enter your first name"),
        lastName: Yup.string().required("Please enter your last name"),
        email: Yup.string().email().required("Please enter an email"),
        password: Yup.string()
        .required("Please enter a password")
        .min(8, "Must Contain 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[0-9])/,
            "Must Contain one Lowercase letter and a Number"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
  //  const createUser = (body) => {
    //    const {firstName, lastName, email, password} = body
        // const sendbody = {
        //     firstName,
        //     lastName,
        //     email,
        //     password
        //     }
        // publicRequest.post("/api/register", sendbody)
        //     .then((res) => {
        //             setAlert(res.data.error)
        //             setMessage(res.data.message)
        //             const {avatar, email, firstName, lastName, password, _id } = res.data.userData
        //             const accessToken = res.data.accessToken
                    // const values = {
                    //         avatar,
                    //         email,
    //                         firstName,
    //                         lastName,
    //                         password,
    //                         accessToken,
    //                         _id,
    //                         loggedIn: true
    //                     }
    //                 if (res.data) return navigate("/");
    //         })
    //         .catch((err) => (err));
    // };//

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
                    <div className="sign-up">
                        <h1 className="mb-4 pb-2 mt-5 color-white">Sign up</h1>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }}
                            validationSchema={schema}
                            // onSubmit={(values) => createUser(values)}
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
                                        <div className="form-floating sign-up-input mb-2 col">
                                            <input
                                                name="firstName"
                                                type="text"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.firstName}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">First name</label>
                                            <p className="error-message">{errors.firstName && touched.firstName && errors.firstName}</p>
                                        </div>
                                        <div className="form-floating mb-2 col">
                                            <input
                                                name="lastName"
                                                type="text"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.lastName}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">Last name</label>
                                            <p className="error-message">{errors.lastName && touched.lastName && errors.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-floating email-input mb-2 col">
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control shadow"
                                                placeholder=" "
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={handleBlur}
                                            />
                                            <label className="ms-3 input-lable">Email address</label>
                                            <p className="error-message">{errors.email && touched.email && errors.email}</p>
                                        </div>
                                    </div>
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
                                            <label className="ms-3 input-lable">Password</label>
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
                                            <label className="ms-3 input-lable">Confirm Password</label>
                                            <p className="error-message">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                                        </div>
                                    </div> 
                                    <button type="submit" className="btn btn-primary my-4 signup-button">
                                        sign up
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
export default SignUp