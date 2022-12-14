import { useSelector } from "react-redux"
import { selectDog } from "../../../Redux/slicer/DogSlice"
import "./dogScrollSpy.css"
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
                <h2 className="text-start">???????????? ????????</h2>
                <p className="mb-0 me-2">????' ??????????: {dogs.length}</p>
            </div>
            <div className="text-end bg-light top-list-container px-3" tabIndex="0" >
                <div dir="rtl" className="row ps-3">
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">????</a>
                        <ul className={addOverflow ? 'dropdown-menu max-height add-overflow' : "dropdown-menu"}>
                        {removeNameDuplicate().map((dog, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + dog.details.dogName}>{dog.details.dogName}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">???????? ??????????</a>
                        <ul className={addOverflow ? 'dropdown-menu max-height add-overflow' : "dropdown-menu"}>
                        {removeChipDuplicate().map((dog, index) => {
                            return(
                                <li key={index}><a className="dropdown-item" href={"#" + dog.details.chipNumber}>{dog.details.chipNumber}</a></li>
                            )}
                        )}
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#Price" role="button" aria-expanded="false">??????</a>
                        <ul className="dropdown-menu max-height">
                            <li><button className="dropdown-item" onClick={() => setGenderKey("??????")} >??????</button></li>
                            <li><button className="dropdown-item" onClick={() => setGenderKey("????????")} >????????</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setGenderKey("")} >??????</button></li>
                        </ul>
                    </div>                      
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">???????? ????????????</a>
                        <ul className="dropdown-menu max-height">
                        <li><button className="dropdown-item" onClick={() => setForAdoptingKey(true)} >???????? ???????? ??????????</button></li>
                            <li><button className="dropdown-item" onClick={() => setForAdoptingKey(false)} >???? ???????? ???????? ????????????</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setForAdoptingKey("")} >??????</button></li>
                        </ul>
                    </div>
                    <div className="col">
                        <a dir="rtl" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#BidDate" role="button" aria-expanded="false">??????????</a>
                        <ul className="dropdown-menu max-height">
                        <li><button className="dropdown-item" onClick={() => setAdoptedrKey(true)} >??????????</button></li>
                            <li><button className="dropdown-item" onClick={() => setAdoptedrKey(false)} >???? ??????????</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><button className="dropdown-item" onClick={() => setAdoptedrKey("")} >??????</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div dir="rtl" className="text-start list-container scrollspy-dog-container bg-light px-3 mt-0" tabindex="0" >
                {filtered(genderKey, adoptedKey, forAdoptingKey).map((dog, index) => {
                    if (dog.display) {
                        serial -= 1
                        return(
                        <Link to={dog._id} className="remove-underline">
                            <div className="row bid-details-container">
                                <div className="col">
                                    <p className="bid-details" id={dog.details.dogName}><span className="ms-2">{serial}.</span>{dog.details.dogName}</p>
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
                    return console.log();
                }
                )}
            </div>
        </div>
    )
}

export default ScrollSpy