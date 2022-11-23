import './animalCard.css'
import { IoMdMore } from 'react-icons/io'
import Modal from '../modal/Modal';
import { useDispatch } from 'react-redux';
import { deleteStatus, updateStatus } from '../../utils/apiCalls';
import { useState } from 'react';
import Alert from '../alert/Alert';

function AnimalCard({ report }) {
    const [alert, setAlert] = useState(true)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")

    const dispatch = useDispatch()
    const handleAlerts = (data) => {
        setAlert(data.error)
        setAlertType(data.alertType)
        setAlertMessage(data.message)
        console.log(alert, alertType, alertMessage );
    }
    return (
        <>
        <div className="card mt-4 animal-card">
            <img src={report.reportDetails.picture.url} className="card-img-top pet-card-img" alt="..." />

            <div className="card-body">
                <div className='card-body-details'>
                    <p className="card-title" dir='rtl'>שם מדווח: {report.reporterDetails.fullName}</p>
                    <p className="card-title" dir='rtl'>תיאור: {report.reportDetails.details}</p>
                    <p className="card-title" dir='rtl'>מיקום:{report.location.place}</p>
                </div>
                <div className='card-body-datetime'>
                    <p className="card-title" dir='rtl'>{report.reportDetails.time.date}</p>
                    <p className="card-title" dir='rtl'>{report.reportDetails.time.hour}</p>
                </div>
                <div className='card-body-btn-container'>

                    <Modal addOverflow={true} className='animal-modal' report={report} title='פרטים נוספים:' modalButtonName='פרטים נוספים' time={report.time} >
                          <div className='card-body-btn-container-status' dir='rtl'>
                            <h6 dir='rtl'>סטאטוס:</h6>
                            <p>{report.status}</p>
                        </div>
                        <div className='animal-modal-img'>
                            <div className='animal-modal-img-container'>
                                <img className='animal-modal-img-container-image' src={report.reportDetails.picture.url} alt="" />
                                {/* <Image cloudName="diggwedxe" publicId={user.avatar.public_id} className="img-thumbnail"/> */}
                            </div>
                        </div>
                        <div className='modal-container-details'>
                            <div dir='rtl'>שם מדווח: {report.reporterDetails.fullName}</div>
                            <div dir='rtl'>תיאור: {report.reportDetails.details}</div>
                            <div dir='rtl'>מיקום: {report.location.place}</div>
                            <div dir='rtl'>אלים: {report.dogDetails.violent}</div>
                            <div dir='rtl'>גודל: {report.dogDetails.size}</div>
                            <div dir='rtl'>צבע: {report.dogDetails.color}</div>
                            <div dir='rtl'>טלפון: {report.reporterDetails.phone}</div>
                        </div>
                        <br></br>
                        <div className='modal-container-datetime'>
                            <p className="card-title">{report.reportDetails.time.date}</p>
                            <p className="card-title">{report.reportDetails.time.hour}</p>
                        </div>


                    </Modal>

                    <div className="btn-group dropup">
                        <button type="button" className="remove-borders" data-bs-toggle="dropdown" aria-expanded="false" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">
                            <div className='more-options-icon-container'>
                                <IoMdMore />
                            </div>
                            <div className='popper'>
                                <p>עדכון סטאטוס</p>
                            </div>
                        </button>
                        <ul className="dropdown-menu" dir='rtl'>
                            <li><a href='#notfound' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "לא נמצא", report,handleAlerts)}>לא נמצא</a></li>
                            <li><a href='#teart' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "טופל בשטח ושוחרר", report,handleAlerts)}>טופל בשטח ושוחרר</a></li>
                            {/* <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "טופל בשטח והועבר לוטרינריה", report)}>טופל בשטח והועבר לוטרינריה</a></li> */}
                            <li><a href='#vet' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "הועבר לוטרינירה", report,handleAlerts)}>הועבר לוטרינריה</a></li>
                            <li><a href= '#dead'className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "החיה נמצאה מתה בשטח", report,handleAlerts)}>החיה נמצאה מתה בשטח</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a href='#delete' className="dropdown-item detele-report " dir='rtl' onClick={() => deleteStatus(dispatch, "מחיקת דיווח", report,handleAlerts)}>מחיקת דיווח</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
        <Alert alertType={alertType} alert={alert} setAlert={setAlert}>
        {alertMessage}
    </Alert>
    </>
    );
}

export default AnimalCard;