import { useState } from "react"
import { useDispatch } from "react-redux"
import Avatar from "../../Components/avatar/Avatar"
import GeneralBody from "../../Components/generalBody/GeneralBody"
import Modal from "../../Components/modal/Modal"
import { approveAdotion, deleteDog, RemoveFromAdoption, sendForAdoptionSite } from "../../utils/apiCalls"
import "./dogPage.css"
import { SiDatadog } from 'react-icons/si'
import { IoHandLeftOutline } from 'react-icons/io5'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import ScrollSpyTreatment from "../../Components/scrollSpy/treatments/ScrollspyTreatment"
import NewTreatment from "../../Components/forms/NewTreatment/NewTreatment"
import EditDogProfile from "../../Components/forms/EditDogProfile/EditDogProfile"
import { useNavigate } from "react-router-dom"
import ScrollSpyAdoption from "../../Components/scrollSpy/AdoptionRequests/AdoptionScrollspy"
import DeleteBtn from "../../Components/forms/DeleteBtn"

const DogPage = ({ dog }) => {
    const [inheritedOpen, setInheritedOpen] = useState(false)
    const [displayTreatments, setDisplayTreatments] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    let windoWidth = window.innerWidth

    return(
        <div className='general-body-container'>
            
        {windoWidth > 600 && 
            <GeneralBody actions={[<NewTreatment dog={dog}/>, <EditDogProfile dog={dog} />]} panelTitle="פרופיל כלב">
                <div className="dog-page-details-container">
                    <div className="row">
                        <div className="col-4 adoption-btn">
                            {!dog.forAdopting && 
                            <Modal modalButtonName="לשלוח לאימוץ?" btnType="success" inheritedOpen={inheritedOpen} >
                                <h3><b>?האם את/ה בטוח/ה</b></h3>
                                <div className="are-you-sure-btn-container mb-5">
                                    <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                    <button className="btn btn-success px-4" onClick={() => {
                                        sendForAdoptionSite(dispatch, dog)
                                        setInheritedOpen(!inheritedOpen)
                                    }}>כן</button>
                                </div>
                            </Modal>}
                            
                            {dog.forAdopting && !dog.adopted && 
                            <>
                            <Modal modalButtonName="אומץ?" btnType="success" inheritedOpen={inheritedOpen}>
                                <h4 dir="rtl"><b>האם את/ה בטוח/ה שאימצו אותי?</b></h4>
                                <div className="are-you-sure-btn-container mb-5">
                                    <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                    <button className="btn btn-success px-4" onClick={() => {
                                        approveAdotion(dispatch, dog)
                                        setInheritedOpen(!inheritedOpen)
                                    }}>כן</button>
                                </div>
                            </Modal>
                            <div className="ms-2">
                                <Modal modalButtonName="להוריד מאתר אימוץ?" btnType="danger" inheritedOpen={inheritedOpen}>
                                    <h4 dir="rtl"><b>האם את/ה בטוח/ה שצריך להוריד אותי מהאתר אימוץ?</b></h4>
                                    <div className="are-you-sure-btn-container mb-5">
                                        <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                        <button className="btn btn-success px-4" onClick={() => {
                                            RemoveFromAdoption(dispatch, dog)
                                            setInheritedOpen(!inheritedOpen)
                                        }}>כן</button>
                                    </div>
                                </Modal>
                            </div>
                            </>
                            }
                            { dog.adopted && 
                            <div className="adopted-dog-icon-container">
                                <SiDatadog className="adopted-dog-icon"/>
                                <h5 dir="rtl" className="adopted-dog">אימצו אותי!</h5>
                            </div> 

                            }
                        </div>
                        <div dir="rtl" className="col dates-container">
                            <div>
                                <p className="dog-details" dir="rtl"><b>תאריך פתיחת תיק: </b><span>{dog.dates.initialDate.date}</span></p>
                                <p className="dog-details" dir="rtl"><b>תאריך העלאה לאימוץ: </b><span>{dog.dates.addForAdoptingDate ? dog.dates.addForAdoptingDate.date : "-"}</span></p>
                                <p className="dog-details" dir="rtl"><b>תאריך אימוץ: </b><span>{dog.dates.AdoptedDate ? dog.dates.AdoptedDate.date : "-"}</span></p>
                            </div>
                            <div className="mb-1">
                                <button onClick={() => setDisplayTreatments(true)} className={`btn btn-${displayTreatments ?  "" : "outline-"}secondary names-btns ms-2`}>טיפולים</button>
                                <button onClick={() => setDisplayTreatments(false)} className={`btn btn-${displayTreatments ?  "outline-" : ""}secondary names-btns`}>בקשות אימוץ</button>
                            </div>
                        </div>
                        <div className="col-3 dog-avatar-container">
                            <Avatar src={dog.details.src.url ? dog.details.src.url : dog.details.src}/>
                        </div>
                    </div>
                    <div className="row">
                    
                        <div className="treatment-scrollspy-container col">
                            {displayTreatments ? <ScrollSpyTreatment dog={dog}/> : <ScrollSpyAdoption dog={dog}/>}
                        </div>
                        <div className="delete-dog-button-container col-3">
                            <div className="dog-details-container">                        
                                <p className="dog-details" dir="rtl"><b> שם: </b><span>{dog.details.dogName}</span></p>
                                <p className="dog-details" dir="rtl"><b> מין: </b><span>{dog.details.gender}</span></p>
                                <p className="dog-details" dir="rtl"><b> גודל: </b><span>{dog.details.size}</span></p>
                                <p className="dog-details" dir="rtl"><b> מספר שבב: </b><span>{dog.details.chipNumber}</span></p>
                                <p className="dog-details" dir="rtl"><b> גיל: </b><span>{dog.details.age}</span></p>
                                <p className="dog-details" dir="rtl"><b> משקל:</b><span>{dog.details.weight}</span></p>
                            </div>
                            <Modal  modalButtonName="מחיקת פרופיל" btnType="danger" className={"delete-dog-button"} inheritedOpen={inheritedOpen}>
                                <h3><b>?האם את/ה בטוח/ה</b></h3>
                                <div className="are-you-sure-btn-container mb-5">
                                    <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                    <button className="btn btn-success px-4" onClick={() => {
                                        deleteDog(dispatch, dog)
                                        setInheritedOpen(!inheritedOpen)
                                        navigate("/adoption")
                                    }}>כן</button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </GeneralBody>}
            {windoWidth < 600 && 
            <GeneralBody actions={[<NewTreatment dog={dog}/>, <EditDogProfile dog={dog}/>, <DeleteBtn dog={dog} className="danger-btn"/>]} panelTitle="פרופיל כלב">
                <div className="row">
                    <div className="col adoption-btn">
                        {!dog.forAdopting && 
                        <Modal modalButtonName="לשלוח לאימוץ?" btnType="success" inheritedOpen={inheritedOpen} >
                            <h3><b>?האם את/ה בטוח/ה</b></h3>
                            <div className="are-you-sure-btn-container mb-5">
                                <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                <button className="btn btn-success px-4" onClick={() => {
                                    sendForAdoptionSite(dispatch, dog)
                                    setInheritedOpen(!inheritedOpen)
                                }}>כן</button>
                            </div>
                        </Modal>}
                        
                        {dog.forAdopting && !dog.adopted && 
                        <>
                        <Modal modalButtonName="אומץ?" btnType="success" inheritedOpen={inheritedOpen}>
                            <h4 dir="rtl"><b>האם את/ה בטוח/ה שאימצו אותי?</b></h4>
                            <div className="are-you-sure-btn-container mb-5">
                                <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                <button className="btn btn-success px-4" onClick={() => {
                                    approveAdotion(dispatch, dog)
                                    setInheritedOpen(!inheritedOpen)
                                }}>כן</button>
                            </div>
                        </Modal>
                        <div className="ms-2">
                            <Modal modalButtonName="להוריד מאתר אימוץ?" btnType="danger" inheritedOpen={inheritedOpen}>
                                <h4 dir="rtl"><b>האם את/ה בטוח/ה שצריך להוריד אותי מהאתר אימוץ?</b></h4>
                                <div className="are-you-sure-btn-container mb-5">
                                    <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                                    <button className="btn btn-success px-4" onClick={() => {
                                        RemoveFromAdoption(dispatch, dog)
                                        setInheritedOpen(!inheritedOpen)
                                    }}>כן</button>
                                </div>
                            </Modal>
                        </div>
                        </>
                        }
                        { dog.adopted && 
                        <div>
                            <SiDatadog className="adopted-dog-icon"/>
                            <h5 dir="rtl" className="adopted-dog">אימצו אותי!</h5>
                        </div> 

                        }
                    </div>
                    <div className="dog-details-container px-0 col">                        
                            <p className="dog-details" dir="rtl"><b> שם: </b><span>{dog.details.dogName}</span></p>
                            <p className="dog-details" dir="rtl"><b> מין: </b><span>{dog.details.gender}</span></p>
                            <p className="dog-details" dir="rtl"><b> גודל: </b><span>{dog.details.size}</span></p>
                    </div>
                    <div className="dog-details-container ps-0 col">                        
                            <p className="dog-details" dir="rtl"><b> מספר שבב: </b><span>{dog.details.chipNumber}</span></p>
                            <p className="dog-details" dir="rtl"><b> גיל: </b><span>{dog.details.age}</span></p>
                            <p className="dog-details" dir="rtl"><b> משקל:</b><span>{dog.details.weight}</span></p>
                    </div>
                    
                    <div className="col-3 dog-avatar-container">
                        <Avatar src={dog.details.src}/>
                    </div>
                </div>
                <div dir="rtl" className="row mt-2">
                    <div className="col dates-container">
                            <div>
                                <p className="dog-details" dir="rtl"><b>תאריך פתיחת תיק: </b><span>{dog.dates.initialDate.date}</span></p>
                                <p className="dog-details" dir="rtl"><b>תאריך העלאה לאימוץ: </b><span>{dog.dates.addForAdoptingDate ? dog.dates.addForAdoptingDate.date : "-"}</span></p>
                                <p className="dog-details" dir="rtl"><b>תאריך אימוץ: </b><span>{dog.dates.AdoptedDate ? dog.dates.AdoptedDate.date : "-"}</span></p>
                            </div>
                    </div>
                    <div className="mt-3 col">
                        <button onClick={() => setDisplayTreatments(true)} className={`btn btn-${displayTreatments ?  "" : "outline-"}secondary ms-2`}><AiOutlineMedicineBox/></button>
                        <button onClick={() => setDisplayTreatments(false)} className={`btn btn-${displayTreatments ?  "outline-" : ""}secondary`}><IoHandLeftOutline/></button>
                    </div>
                </div>
                <div className="row">
                    <div className="treatment-scrollspy-container col">
                        {displayTreatments ? <ScrollSpyTreatment dog={dog}/> : <ScrollSpyAdoption dog={dog}/>}
                    </div>
                    
                </div>
                
            </GeneralBody>}
        </div>
    )
}

export default DogPage