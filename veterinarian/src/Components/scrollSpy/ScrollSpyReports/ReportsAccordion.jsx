import React, { useState } from 'react'
import Modal from '../../modal/Modal'
import { IoMdMore } from "react-icons/io"
import { deleteStatus, updateStatus } from '../../../utils/apiCalls'
import { useDispatch } from 'react-redux'



const ReportAccordion =({ report, serial }) =>{
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

  return (
    <div className="row bid-details-container" onClick={() => setOpen(!open)}>
        <div className="col">
            <p className="bid-details" id={report.reporterDetails.fullName}><span className="ms-2">{serial}.</span>{report.reporterDetails.fullName}</p>
        </div>            
        <div className="col mt-3">
            <p>
            <a href={`tel:${report.reporterDetails.phone}`} className="bid-details" id={report.reporterDetails.phone}>{report.reporterDetails.phone}</a>
            </p>
        </div>
        <div className="col">
            <p className="bid-details" id={report.reportDetails.time.date}>{report.reportDetails.time.date}</p>
        </div>            
        <div className="col">
            <p className="bid-details" id={report.reportDetails.time.hour}>{report.reportDetails.time.hour}</p>
        </div>            
        <div className="col" >
            <p className="bid-details neighborhood pb-0" onClick={()=>window.open("https://maps.google.com?q="+`${report.location.neighborhood+" "+report.location.street} דימונה`)} id={report.location.neighborhood}>{report.location.neighborhood}</p>
            <p><b>רח':</b>{" "}{report.location.street}</p>
        </div>            
        <div className="col-1">
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
                <li><a href= '#dead'className="dropdown-item" dir='rtl' onClick={() => updateStatus(dispatch, "החיה נמצאה מתה בשטח", report)}>החיה נמצאה מתה בשטח</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a href='delete' className="dropdown-item detele-report " dir='rtl' onClick={() => deleteStatus(dispatch, "מחיקת דיווח", report)}>מחיקת דיווח</a></li>
            </ul> 
        </div>
        </div>   
        {open &&
        <div className="accordion-body-container">
            <div className="collaps-container-reports">
                <p className="bid-details" id={report.reportDetails.details}>{report.reportDetails.details}</p>
            </div>
            <div className="mdal-and-opition">
                <Modal addOverflow={true} className='animal-modal' report={report} title='פרטים נוספים:' modalButtonName='פרטים נוספים' time={report.time} >
                    <div className='card-body-btn-container-status' dir='rtl'>
                        <h6 dir='rtl'>סטאטוס:</h6>
                        <p>{report.status}</p>
                    </div>
                    <div className='animal-modal-img'>
                        <div className='animal-modal-img-container'>
                            <img className='animal-modal-img-container-image' src={report.reportDetails.picture.url} alt="" />
                        </div>
                    </div>
                    <div className='modal-container-details'>
                        <div dir='rtl'>שם מדווח: {report.reporterDetails.fullName}</div>
                        <div dir='rtl'>מיקום: {report.location.place}</div>
                        <div dir='rtl'>תיאור: {report.reportDetails.details}</div>
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
            </div>
        </div>
        }           
    </div>
  )
}

export default ReportAccordion