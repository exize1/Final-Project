import { useEffect } from 'react'
import './alert.css'

const Alert  = ({ alert, alertType, setAlert, unwidth, children }) => {

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
          }, 2000);
    }, [alert, setAlert])

    return(
        <div className={unwidth ? "alert-container-unwidth" : "alert-container"}> 
            <div className={`alert alert-${alertType} save-spot-alert right-to-left mb-4`} role="alert" hidden={!alert}>
               {children}
            </div>
        </div>
    )
}

export default Alert