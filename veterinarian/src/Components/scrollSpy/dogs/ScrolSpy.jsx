import { useSelector } from "react-redux"
import { selectDog } from "../../../Redux/slicer/DogSlice"
import "../scrollspy.css"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useState } from "react"



const ScrollSpy = ({ addOverflow }) =>{

    const dogs = useSelector(selectDog)
    const [genderKey, setGenderKey] = useState("")
    const [adoptedKey, setAdoptedrKey] = useState("")
    const [forAdoptingKey, setForAdoptingKey] = useState("")

    const filtered = (genderKey, adoptedKey, forAdoptingKey) => {
        return(
            dogs.filter((val) => {
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
        
    const removeChipDuplicate = () => {
        let dogsWithoutDup = []
        let isInclude = false
            filtered(genderKey, adoptedKey, forAdoptingKey).forEach((element) => {
                dogsWithoutDup.length === 0 && dogsWithoutDup.push(element)
                if (dogsWithoutDup.length !== 0){
                    dogsWithoutDup.forEach(newElement => {
                        if(newElement.details.chipNumber.includes(element.details.chipNumber)){
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
        let dogsWithoutDup = []
        let isInclude = false
        filtered(genderKey, adoptedKey, forAdoptingKey).forEach((element) => {
                dogsWithoutDup.length === 0 && dogsWithoutDup.push(element)
                if (dogs.length !== 0){
                    dogsWithoutDup.forEach(newElement => {
                         if(newElement.details.dogName.includes(element.details.dogName)){
                            isInclude = true
                        }
                    })
                    !isInclude && dogsWithoutDup.push(element)  
                    isInclude = false
                }
            });
            return dogsWithoutDup
    }

    let serial = dogs.length + 1
    return( 
        <div className="">
            <div dir="rtl" className="title-list-container px-3 pt-3" tabindex="0" >
                <h2 className="text-start">הכלבים שלנו</h2>
                <p className="mb-0 me-2">מס' כלבים: {dogs.length}</p>
            </div>
            <div className="text-end bg-light top-list-container px-2" tabIndex="0" >
                <div dir="rtl" className="row ps-4">
                    <div className="col">
                        <p className="m-0">מס"ד</p>
                    </div>    
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">שם</a>
                        <ul className={addOverflow ? 'dropdown-menu add-overflow' : "dropdown-menu"}>
                        {removeNameDuplicate().map((dog, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + dog.details.dogName}>{dog.details.dogName}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">מספר שיבוב</a>
                        <ul className={addOverflow ? 'dropdown-menu add-overflow' : "dropdown-menu"}>
                        {removeChipDuplicate().map((dog, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + dog.details.chipNumber}>{dog.details.chipNumber}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#Price" role="button" aria-expanded="false">מין</a>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => setGenderKey("זכר")} >זכר</button></li>
                            <li><button className="dropdown-item" onClick={() => setGenderKey("נקבה")} >נקבה</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setGenderKey("")} >הכל</button></li>
                        </ul>
                    </div>                      
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">מחכה לאימוץ</a>
                        <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setForAdoptingKey(true)} >נשלח לאתר אימוץ</button></li>
                            <li><button className="dropdown-item" onClick={() => setForAdoptingKey(false)} >לא נשלח לאתר לאימוץ</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setForAdoptingKey("")} >הכל</button></li>
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">מאומץ</a>
                        <ul className="dropdown-menu">
                        <li><button className="dropdown-item" onClick={() => setAdoptedrKey(true)} >מאומץ</button></li>
                            <li><button className="dropdown-item" onClick={() => setAdoptedrKey(false)} >לא מאומץ</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setAdoptedrKey("")} >הכל</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-example bg-light px-3 mt-0" tabindex="0" >
                {filtered(genderKey, adoptedKey, forAdoptingKey).map((dog, index) => {
                    serial -= 1
                    return(
                        <Link to={dog._id} className="remove-underline">
                            <div className="row bid-details-container">
                                <div className="col">
                                    <p className="bid-details">{serial}.</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={dog.details.dogName}>{dog.details.dogName}</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={dog.details.chipNumber}>{dog.details.chipNumber}</p>
                                </div>
                                <div className="col">
                                    <p className="bid-details" id={dog.details.gender}>{dog.details.gender}</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={dog.forAdopting}>{dog.forAdopting ? <AiOutlineCheck style={{color: "green"}}/> : <AiOutlineClose style={{color: "red"}}/> }</p>
                                </div>            
                                <div className="col">
                                    <p className="bid-details" id={dog.adopted}>{dog.adopted ?<AiOutlineCheck style={{color: "green"}}/> :  <AiOutlineClose style={{color: "red"}}/> }</p>
                                </div>            
                            </div>
                        </Link>
                    )}
                )}
            </div>
        </div>
    )
}

export default ScrollSpy