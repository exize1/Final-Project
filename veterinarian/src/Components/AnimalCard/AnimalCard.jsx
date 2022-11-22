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
                <div className='card-body-details'>
                    <div className='modal-container-details-text' dir='rtl'>
                        <p dir='rtl' className='modal-container-details-text-title'>שם מדווח: </p>
                        <p>{report.reporterDetails.fullName}</p>
                    </div>

                    <div className='modal-container-details-text' dir='rtl'>
                        <p dir='rtl' className='modal-container-details-text-title'>תיאור:</p>
                        <p>{report.reportDetails.details}</p>
                    </div>
                    <div className='modal-container-details-text' dir='rtl'>
                        <p dir='rtl' className='modal-container-details-text-title'>שכונה:</p>
                        <p>{report.location.neighborhood}</p>
                    </div>
                </div>
                <div className='card-body-datetime'>
                    <h5 className="card-title" dir='rtl'>{report.reportDetails.time.date}</h5>
                    <h5 className="card-title" dir='rtl'>{report.reportDetails.time.hour}</h5>
                </div>
                <div className='card-body-btn-container'>
                    <Modal addOverflow={true} className='animal-modal' dir='rtl' report={report} title='פרטים נוספים:' modalButtonName='פרטים נוספים' time={report.time} >
                        <div className='card-body-btn-container-status' dir='rtl'>
                            <p dir='rtl' className='card-body-btn-container-status-title'>סטאטוס:</p>
                            <p>{report.status}</p>
                        </div>
                        <div className='animal-modal-img'>
                            <div className='animal-modal-img-container'>
                                <img className='animal-modal-img-container-image' src={report.reportDetails.picture.url} alt="" />
                                {/* <Image cloudName="diggwedxe" publicId={user.avatar.public_id} className="img-thumbnail"/> */}
                            </div>
                        </div>
                        <div className='modal-container-details'>
                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>שם מדווח:</p>
                                <p>{report.reporterDetails.fullName}</p>
                            </div>
                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>תיאור:</p>
                                <p>{report.reportDetails.details}</p>
                            </div>


                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>שכונה:</p>
                                <p>{report.location.neighborhood}</p>
                            </div>

                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>רחוב:</p>
                                <p>{report.location.street}</p>
                            </div>

                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>אלים:</p>
                                <p>{report.dogDetails.violent}</p>
                            </div>

                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>גודל:</p>
                                <p>{report.dogDetails.size}</p>
                            </div>

                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>צבע:</p>
                                <p>{report.dogDetails.color}</p>
                            </div>

                            <div className='modal-container-details-text' dir='rtl'>
                                <p dir='rtl' className='modal-container-details-text-title'>טלפון:</p>
                                <p>{report.reporterDetails.phone}</p>
                            </div>
                        </div>
                        <br></br>
                        <div className='modal-container-datetime'>
                            <h5 className="card-title">{report.reportDetails.time.date}</h5>
                            <h5 className="card-title">{report.reportDetails.time.hour}</h5>
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
                            <li><a href='#notfound' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "לא נמצא", report)}>לא נמצא</a></li>
                            <li><a href='#teart' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "טופל בשטח ושוחרר", report)}>טופל בשטח ושוחרר</a></li>
                            {/* <li><a className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "טופל בשטח והועבר לוטרינריה", report)}>טופל בשטח והועבר לוטרינריה</a></li> */}
                            <li><a href='#vet' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "הועבר לוטרינירה", report)}>הועבר לוטרינריה</a></li>
                            <li><a href='#dead' className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "החיה נמצאה מתה בשטח", report)}>החיה נמצאה מתה בשטח</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a href='delete' className="dropdown-item detele-report " dir='rtl' onClick={() => deleteStatus(dispatch, "מחיקת דיווח", report)}>מחיקת דיווח</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AnimalCard;