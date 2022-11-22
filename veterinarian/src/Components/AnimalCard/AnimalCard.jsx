import './animalCard.css'
import { IoMdMore } from 'react-icons/io'
import Modal from '../modal/Modal';
import { useDispatch } from 'react-redux';
import { deleteStatus, updateStatus } from '../../utils/apiCalls';

function AnimalCard({ report }) {

    const dispatch = useDispatch()
    return (
        <div className="card mt-4 animal-card">
            <img src={report.reportDetails.picture.url} className="card-img-top pet-card-img" alt="..." />

            <div className="card-body">
                <h5 className="card-title">{report.reporterDetails.fullName}</h5>
                <h5 className="card-title">{report.reportDetails.details}</h5>
                <h5 className="card-title">{report.location.place}</h5>
                <h5 className="card-title">{report.reportDetails.time.date}</h5>
                <h5 className="card-title">{report.reportDetails.time.hour}</h5>
                <div className='card-body-btn-container'>
                    <Modal addOverflow={true} className='animal-modal' report={report} title='פרטים נוספים:' modalButtonName='פרטים נוספים' time={report.time} >
                        <div dir='rtl'>סטאטוס: {report.status}</div>
                        <div className='animal-modal-img'>
                            <div className='animal-modal-img-container'>
                                <img className='animal-modal-img-container-image' src={report.reportDetails.picture.url} alt="image" />
                                {/* <Image cloudName="diggwedxe" publicId={user.avatar.public_id} className="img-thumbnail"/> */}
                            </div>
                        </div>

                        <div dir='rtl'>שם מדווח: {report.reporterDetails.fullName}</div>
                        <div dir='rtl'>תיאור: {report.reportDetails.details}</div>
                        <div dir='rtl'>מיקום: {report.location.place}</div>
                        <div dir='rtl'>אלים: {report.dogDetails.violent}</div>
                        <div dir='rtl'>גודל: {report.dogDetails.size}</div>
                        <div dir='rtl'>צבע: {report.dogDetails.color}</div>
                        <div dir='rtl'>טלפון: {report.reporterDetails.phone}</div>
                        <span>
                            <h5 className="card-title">{report.reportDetails.time.date}</h5>
                            <h5 className="card-title">{report.reportDetails.time.hour}</h5>
                        </span>

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
                            <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "לא נמצא", report)}>לא נמצא</a></li>
                            <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "טופל בשטח ושוחרר", report)}>טופל בשטח ושוחרר</a></li>
                            {/* <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "טופל בשטח והועבר לוטרינריה", report)}>טופל בשטח והועבר לוטרינריה</a></li> */}
                            <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "הועבר לוטרינירה", report)}>הועבר לוטרינריה</a></li>
                            <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "החיה נמצאה מתה בשטח", report)}>החיה נמצאה מתה בשטח</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item detele-report " dir='rtl' onClick={() => deleteStatus(dispatch, "מחיקת דיווח", report)}>מחיקת דיווח</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AnimalCard;