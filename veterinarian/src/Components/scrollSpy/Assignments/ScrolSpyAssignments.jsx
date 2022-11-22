import { useDispatch, useSelector } from "react-redux"
// import { selectDog } from "../../../Redux/slicer/DogSlice"
import "./ScrolSpyAssignments.css"
import {  AiOutlineCheck } from "react-icons/ai"
// import { Link } from "react-router-dom"
import { useState } from "react"
import { selectAssignments } from "../../../Redux/slicer/Assignments"
import Modal from "../../modal/Modal"
import { finishAssignment } from "../../../utils/apiCalls"
import { selectUser } from "../../../Redux/slicer/UserSlice"
const ScrolSpyAssignments = ({ addOverflow }) =>{
    const assignments = useSelector(selectAssignments)
    const user = useSelector(selectUser)
    console.log(user);
    console.log(assignments);
    const [type, setType] = useState("")
    // const [openCompite, setOpenCompite] = useState(false)
    const [inheritedOpen, setInheritedOpen] = useState(false)
    // const [assignmentSelectedId, setassignmentSelectedId] = useState("")
    // const [genderKey, setGenderKey] = useState("")
    const [adoptedKey, setAdoptedrKey] = useState("")
    const [forAdoptingKey, setForAdoptingKey] = useState("")
    const [complitedOpen, setComplitedOpen] = useState(false)
    const [complitedOpenId, setComplitedOpenId] = useState("")
    const dispatch = useDispatch()
    const filtered = (filterKey) => {
        return(
            assignments.filter((val) => {
                if(filterKey === ""){
                    return val;
                }else if(val.type.includes(filterKey)){
                    return val;
                }else return null
             })
            )
        }
        
        const removeDateDuplicate = () => {
            let dogsWithoutDup = []
            let isInclude = false
            filtered(type).forEach((element) => {
                    dogsWithoutDup.length === 0 && dogsWithoutDup.push(element)
                    if (dogsWithoutDup.length !== 0){
                        dogsWithoutDup.forEach(newElement => {
                            if(newElement.treatmentDate.date.includes(element.treatmentDate.date)){
                                isInclude = true
                            }
                        })
                        !isInclude && dogsWithoutDup.push(element)  
                        isInclude = false
                    }
                });
                return dogsWithoutDup
        }
        const removeNameDuplicate = () => {
            let assignmentsWithoutDup = []
            let isInclude = false
            filtered(type).forEach((element) => {
                assignmentsWithoutDup.length === 0 && assignmentsWithoutDup.push(element)
                    if (assignments.length !== 0){
                        assignmentsWithoutDup.forEach(newElement => {
                             if(newElement.dogHandlerName.includes(element.dogHandlerName)){
                                isInclude = true
                            }
                        })
                        !isInclude && assignmentsWithoutDup.push(element)  
                        isInclude = false
                    }
                });
                return assignmentsWithoutDup
        }
    let serial = assignments.length + 1
    return( 
        <div className="">
            <div dir="rtl" className="title-list-container px-3 pt-3" tabindex="0" >
                <h2 className="text-start">משימות לביצוע</h2>
                <p className="mb-0 me-2">מס' משימות: {assignments.length}</p>
            </div>
            <div className="text-end bg-light top-list-container px-3" tabIndex="0" >
                <div dir="rtl" className="row ps-3">
                    <div className="col-2">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false"> שם העובד</a>
                        <ul className={addOverflow ? 'dropdown-menu add-overflow' : "dropdown-menu"}>
                        {removeNameDuplicate().map((assignment, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + assignment.dogHandlerName}>{assignment.dogHandlerName}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col-2">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">מספר שיבוב</a>
                        <ul className={addOverflow ? 'dropdown-menu add-overflow' : "dropdown-menu"}>
                        {removeNameDuplicate().map((assignment, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + assignment.dogNumber}>{assignment.dogNumber}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col-2">
                    <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">תאריך</a>
                        <ul className="dropdown-menu">
                        {removeNameDuplicate().map((treatment, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + treatment.dateUpload}>{treatment.dateUpload}</a></li>
                            )}
                        )}
                        </ul>
                    </div>                      
                    <div className="col-2">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">תאריך יעד</a>
                        <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setForAdoptingKey(true)} >הכי קרוב</button></li>
                            <li><button className="dropdown-item" onClick={() => setForAdoptingKey(false)} >הכי רחוק</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setForAdoptingKey("")} >הכל</button></li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <a dir="rtl" className="nav-link " data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">פרטים </a>
                        
                    </div>
                    <div className="col-1">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">בוצע </a>
                        <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setAdoptedrKey(true)} >בוצע</button></li>
                            <li><button className="dropdown-item" onClick={() => setAdoptedrKey(false)} >לא בוצע</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setAdoptedrKey("")} >הכל</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-asignment bg-light px-3 mt-0" tabindex="0" >
                {assignments.map((assignment, index) => {
                        serial -= 1
                        return(
                            <div className="row bid-details-container">
                                <div className="col-2">
                                    <p className="bid-details" id={assignment.dogHandlerName}><span className="ms-2">{serial}.</span>{assignment.dogHandlerName}</p>
                                </div>            
                                <div className="col-2">
                                    <p className="bid-details" id={assignment.dogNumber}>{assignment.dogNumber}</p>
                                </div>
                                <div className="col-2">
                                    <p className="bid-details" id={assignment.dateUpload}>{assignment.dateUpload}</p>
                                </div>            
                                <div className="col-2">
                                    <p className="bid-details" id={assignment.dateToEnd}>{assignment.dateToEnd}</p>
                                </div>            
                                <div className="col-2">
                                    <p className="bid-details" id={assignment.details}>{assignment.details}</p>
                                </div>            
                                <div className="col-1">
                                    <p className="bid-details" id={assignment.complited}>
                                        {
                                        assignment.complited ?
                                        <div>
                                        <AiOutlineCheck style={{color: "green"}} onClick={()=>
                                            {setComplitedOpen(true)
                                             setComplitedOpenId(assignment._id)
                                            }}/>
                                        {
                                    complitedOpen && assignment._id===complitedOpenId?
                                    <div>בוצע ע"י: {assignment.WhoComplited}</div>
                                    :console.log() 
                                        }
                                    </div>
                                    : 
                                    <Modal checkbox={true} modalButtonName="משימה בוצעה?" inheritedOpen={inheritedOpen} >
                                            <h3><b>?האם את/ה בטוח/ה</b></h3>
                                           <div className="are-you-sure-btn-container mb-5">
                                           <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                             <button className="btn btn-success px-4" onClick={() => {
                                             finishAssignment(dispatch,assignment._id,user._id)
                                             setInheritedOpen(!inheritedOpen)
                                                 }}>כן</button>
                                                  </div>
                                    </Modal>
                                     }
                                     </p>
 
                                 </div>            
                             </div>
                         )
                     }
                 )}
             </div>
         </div>
     )
 }
 export default ScrolSpyAssignments