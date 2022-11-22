import { useSelector } from "react-redux"
import { selectDog } from "../../../Redux/slicer/DogSlice"
import "./scrollspyTreatment.css"
import { useState } from "react"



const ScrollSpyTreatment = ({ addOverflow, dog }) =>{

    const dogs = useSelector(selectDog)
    const [type, setType] = useState("")
    const filtered = (filterKey) => {
        return(
            dog.treatments.filter((val) => {
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
        let treatmentsWithoutDup = []
        let isInclude = false
        filtered(type).forEach((element) => {
                treatmentsWithoutDup.length === 0 && treatmentsWithoutDup.push(element)
                if (dogs.length !== 0){
                    treatmentsWithoutDup.forEach(newElement => {
                         if(newElement.treatmentName.includes(element.treatmentName)){
                            isInclude = true
                        }
                    })
                    !isInclude && treatmentsWithoutDup.push(element)  
                    isInclude = false
                }
            });
            return treatmentsWithoutDup
    }

    let serial = dog.treatments.length + 1
    return( 
        <div className="">
            <div dir="rtl" className="title-list-container px-3 pt-3" tabindex="0" >
                <h2 className="text-start">הטיפולים שלי</h2>
                <p className="mb-0 me-2">מס' טיפולים: {dog.treatments.length}</p>
            </div>
            <div className="text-end bg-light top-list-container px-3" tabIndex="0" >
                <div dir="rtl" className="row ps-3">
                    <div className="col-2">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">סוג טיפול</a>
                        <ul className={addOverflow ? 'dropdown-menu add-overflow' : "dropdown-menu"}>
                        <li><button className="dropdown-item" onClick={() => setType("תרופתי")} >תרופתי</button></li>
                            <li><button className="dropdown-item" onClick={() => setType("חיסון")} >חיסון</button></li>
                            <li><button className="dropdown-item" onClick={() => setType("אחר")} >אחר</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setType("")} >הכל</button></li>
                        </ul>
                    </div>
                    <div className="col-2">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">שם</a>
                        <ul className={addOverflow ? 'dropdown-menu add-overflow' : "dropdown-menu"}>
                        {removeNameDuplicate().map((treatment, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + treatment.treatmentName}>{treatment.treatmentName}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col-1">
                        <p className="m-0">כמות</p>
                    </div>   
                    <div className="col-5">
                        <p className="m-0">פירוט</p>
                    </div>                        
                    <div className="col-2">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">תאריך</a>
                        <ul className="dropdown-menu">
                        {removeDateDuplicate().map((treatment, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + treatment.treatmentDate.date}>{treatment.treatmentDate.date}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-example bg-light px-3 mt-0" tabindex="0" >
                {filtered(type).map((treatment, index) => {
                    serial -= 1
                    return(
                        // <Link to={dog._id} className="remove-underline">
                            <div className="row bid-details-container">
                                <div className="col-2">
                                    <p className="bid-details" id={treatment.type}>{serial}{". "}{treatment.type}</p>
                                </div>            
                                <div className="col-2">
                                    <p className="bid-details" id={treatment.treatmentName}>{treatment.treatmentName}</p>
                                </div>
                                <div className="col-1">
                                    <p className="bid-details" id={treatment.amount}>{treatment.amount}</p>
                                </div>            
                                <div className="col-5">
                                    <p className="bid-details" id={treatment.description}>{treatment.description }</p>
                                </div>            
                                <div className="col-2">
                                    <p className="bid-details" id={treatment.treatmentDate.date}>{treatment.treatmentDate.date }</p>
                                </div>            
                            </div>
                        // </Link>
                    )}
                )}
            </div>
        </div>
    )
}

export default ScrollSpyTreatment