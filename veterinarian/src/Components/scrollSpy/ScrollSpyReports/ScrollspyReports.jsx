import { useDispatch, useSelector } from "react-redux"
import { selectDog } from "../../../Redux/slicer/DogSlice"
import "./ScrollspyReports.css"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useState } from "react"
import { selectReport } from "../../../Redux/slicer/ReportsSlice"
import Modal from "../../modal/Modal"
import { IoMdMore } from "react-icons/io"
import { deleteStatus, updateStatus } from "../../../utils/apiCalls"



const ScrollSpyReports = ({ addOverflow }) =>{
    const dispatch = useDispatch()

    const dogs = useSelector(selectDog)
    const [genderKey, setGenderKey] = useState("")
    const [adoptedKey, setAdoptedrKey] = useState("")
    const [forAdoptingKey, setForAdoptingKey] = useState("")
    const allReports = useSelector(selectReport)
    console.log(allReports);
    const filtered = (genderKey, adoptedKey, forAdoptingKey) => {
        return(
            allReports.filter((val) => {
                if(genderKey === ""){
                    return val;
                }else if(val.details.gender.includes(genderKey)){
                    return val;
                }else return null
             })
            ).filter((val) => {
                if(forAdoptingKey === ""){
                    return val;
                }else if(val.forAdopting === forAdoptingKey){
                    return val;
                }else return null
            }).filter((val) => {
                if(adoptedKey === ""){
                    return val;
                }else if(val.adopted === adoptedKey ){
                    return val;
                }else return null
             }
            )
        }
        
    const removeDateDuplicate = () => {
        let DateWithoutDup = []
        let isInclude = false
            filtered(genderKey, adoptedKey, forAdoptingKey).forEach((element) => {
                DateWithoutDup.length === 0 && DateWithoutDup.push(element)
                if (DateWithoutDup.length !== 0){
                    DateWithoutDup.forEach(report => {
                        if(report.reportDetails.time.date.includes(element.reportDetails.time.date)){
                            isInclude = true
                        }
                    })
                    !isInclude && DateWithoutDup.push(element)  
                    isInclude = false
                }
            });
            return DateWithoutDup
    }
    const removeHourDuplicate = () => {
        let HourWithoutDup = []
        let isInclude = false
            filtered(genderKey, adoptedKey, forAdoptingKey).forEach((element) => {
                HourWithoutDup.length === 0 && HourWithoutDup.push(element)
                if (HourWithoutDup.length !== 0){
                    HourWithoutDup.forEach(report => {
                        if(report.reportDetails.time.hour.includes(element.reportDetails.time.hour)){
                            isInclude = true
                        }
                    })
                    !isInclude && HourWithoutDup.push(element)  
                    isInclude = false
                }
            });
            return HourWithoutDup
    }
    const removeNameDuplicate = () => {
        let reportsWithoutDup = []
        let isInclude = false
        filtered(genderKey, adoptedKey, forAdoptingKey).forEach((element) => {
            reportsWithoutDup.length === 0 && reportsWithoutDup.push(element)
                if (allReports.length !== 0){
                    reportsWithoutDup.forEach(newElement => {
                         if(newElement.reporterDetails.fullName.includes(element.reporterDetails.fullName)){
                            isInclude = true
                        }
                    })
                    !isInclude && reportsWithoutDup.push(element)  
                    isInclude = false
                }
            });
            return reportsWithoutDup
    }

    let serial = allReports.length + 1
    return( 
        <div className="">
            <div dir="rtl" className="title-list-container px-3 pt-3" tabindex="0" >
                <h2 className="text-start">דיווחים</h2>
                <p className="mb-0 me-2">מס' דיווחים: {allReports.length}</p>
            </div>
            <div className="text-end bg-light top-list-container px-3" tabIndex="0" >
                <div dir="rtl" className="row ps-3">
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">שם המדווח</a>
                        <ul className={addOverflow ? 'dropdown-menu max-height add-overflow' : "dropdown-menu"}>
                        {removeNameDuplicate().map((report, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + report.reporterDetails.fullName}>{report.reporterDetails.fullName}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link " data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">מספר פלאפון</a>
                        
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#Price" role="button" aria-expanded="false">תאריך</a>
                        <ul className={addOverflow ? 'dropdown-menu max-height add-overflow' : "dropdown-menu"}>
                        {removeDateDuplicate().map((report, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + report.reportDetails.time.date}>{report.reportDetails.time.date}</a></li>
                            )}
                        )}
                        </ul>
                    </div>                      
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">שעה</a>
                        <ul className={addOverflow ? 'dropdown-menu max-height add-overflow' : "dropdown-menu"}>
                        {removeHourDuplicate().map((report, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + report.reportDetails.time.hour}>{report.reportDetails.time.hour}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">מיקום</a>
                        <ul className={addOverflow ? 'dropdown-menu max-height add-overflow' : "dropdown-menu"}>
                        {allReports.map((report, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + report.location.neighborhood}>{report.location.neighborhood}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link " data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">פרטים</a>
                        
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-dog-container bg-light px-3 mt-0" tabindex="0" >
                {filtered(genderKey, adoptedKey, forAdoptingKey).map((report, index) => {
                        serial -= 1
                        return(
                            <div className="row bid-details-container">
                                <div className="col">
                                    <p className="bid-details" id={report.reporterDetails.fullName}><span className="ms-2">{serial}.</span>{report.reporterDetails.fullName}</p>
                                </div>            
                                <div className="col">
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
                                <div className="col" onClick={()=>window.open("https://maps.google.com?q="+`${report.location.neighborhood+" "+report.location.street} דימונה`)}>
                                    <p className="bid-details" id={report.location.neighborhood}>{report.location.neighborhood} {report.location.street}</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={report.reportDetails.details}>{report.reportDetails.details}</p>
                                </div>            
                                {/* <div className="col">
                                    <p className="bid-details" id={dog.forAdopting}>{dog.forAdopting ? <AiOutlineCheck style={{color: "green"}}/> : <AiOutlineClose style={{color: "red"}}/> }</p>
                                </div>             */}
                                {/* <div className="col">
                                    <p className="bid-details" id={dog.adopted}>{dog.adopted ?<AiOutlineCheck style={{color: "green"}}/> :  <AiOutlineClose style={{color: "red"}}/> }</p>
                               </div>             */}
                                <div className="mdal-and-opition">

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
                          
                          
                          
                            </div>
                    )}
                )}
            </div>
        </div>
    )
}

export default ScrollSpyReports