import { useDispatch, useSelector } from "react-redux"
import "./ScrollspyReports.css"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import { useState } from "react"
import { selectReport } from "../../../Redux/slicer/ReportsSlice"
import Modal from "../../modal/Modal"
import { IoMdMore } from "react-icons/io"
import { deleteStatus, updateStatus } from "../../../utils/apiCalls"
import ReportAccordion from "./ReportsAccordion"



const ScrollSpyReports = ({ addOverflow }) =>{
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const allReports = useSelector(selectReport)
    console.log(allReports);

        
    const removeDateDuplicate = () => {
        let DateWithoutDup = []
        let isInclude = false
            allReports.forEach((element) => {
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
            allReports.forEach((element) => {
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
        allReports.forEach((element) => {
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
                <h2 className="text-start scrollspy-title">דיווחים</h2>
                <p className="mb-0 me-2 scrollspy-sum">מס' דיווחים: {allReports.length}</p>
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
                    <div className="col-1">
                        <a dir="rtl" className="nav-link " data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false"></a>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-dog-container bg-light px-3 mt-0" tabindex="0" >
                {allReports.map((report, index) => {
                        serial -= 1
                        return(
                            <ReportAccordion report={report} serial={serial}/>
                    )}
                )}
            </div>
        </div>
    )
}

export default ScrollSpyReports