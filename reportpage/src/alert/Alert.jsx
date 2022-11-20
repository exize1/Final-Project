import './alert.css'

const Alert  = ({ alert, alertType, children }) => {


    return(
        <div className="alert-container"> 
            <div className={`alert alert-${alertType} save-spot-alert right-to-left mb-4`} role="alert" hidden={!alert}>
               {children}
            </div>
        </div>
    )
}

export default Alert