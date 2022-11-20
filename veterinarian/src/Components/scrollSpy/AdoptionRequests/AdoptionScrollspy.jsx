import { useSelector } from "react-redux"
import { selectDog } from "../../../Redux/slicer/DogSlice"
import { useState } from "react"
import { selectAdoption } from "../../../Redux/slicer/DogReqSlice"



const ScrollSpyAdoption = ({ addOverflow, dog, displayTreatments }) =>{

    const dogRequests = useSelector(selectAdoption)
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
        
    const filteredReq = (filterKey) => {
        return(
            dogRequests.filter((val) => {
                if(val.dogId){
                    if(filterKey === ""){
                        return val;
                    }else if(val.dogId.includes(filterKey)){
                        return val;
                    }else return null
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
                if (treatmentsWithoutDup.length !== 0){
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
    let dogReqSerial = filteredReq(dog._id).length + 1
    return( 
        <div className="">
            <div dir="rtl" className="title-list-container px-3 pt-3" tabindex="0" >
                <h2 className="text-start">המאמצים העתידיים שלי</h2>
                <p className="mb-0 me-2">מס' בקשות אימוץ: {filteredReq(dog._id).length}</p>
            </div>
            <div className="text-end bg-light top-list-container px-2" tabIndex="0" >
                <div dir="rtl" className="row ps-4">
                    <div className="col">
                        <p className="m-0">מס"ד ושם</p>
                    </div>    
                    <div className="col">
                        <p className="m-0">אימייל</p>
                    </div>   
                    <div className="col">
                        <p className="m-0">פלאפון</p>
                    </div>                        
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">תאריך</a>
                        <ul className="dropdown-menu">
                        {/* {removeDateDuplicate().map((treatment, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + treatment.treatmentDate.date}>{treatment.treatmentDate.date}</a></li>
                            )}
                        )} */}
                        </ul>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-example bg-light px-3 mt-0" tabindex="0" >
                {filteredReq(dog._id).map((dogReq, index) => {
                    dogReqSerial -= 1
                    return(
                        // <Link to={dog._id} className="remove-underline">
                            <div className="row bid-details-container">
                                <div className="col">
                                    <p className="bid-details" id={dogReq.fullName}>{dogReqSerial}. {dogReq.fullName}</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={dogReq.email}>{dogReq.email}</p>
                                </div>
                                <div className="col">
                                    <p className="bid-details" id={dogReq.phone}>{dogReq.phone}</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={dogReq.dates && dogReq.dates.date}>{dogReq.dates && dogReq.dates.date}</p>
                                </div>            
                            </div>
                        // </Link>
                    )}
                )}
            </div>
        </div>
    )
}

export default ScrollSpyAdoption