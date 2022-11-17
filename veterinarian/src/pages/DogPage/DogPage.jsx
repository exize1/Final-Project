import { useState } from "react"
import { useDispatch } from "react-redux"
import Avatar from "../../Components/avatar/Avatar"
import NewMission from "../../Components/forms/NewMission/NewMission"
import GeneralBody from "../../Components/generalBody/GeneralBody"
import Modal from "../../Components/modal/Modal"
import ScrollSpy from "../../Components/scrollSpy/dogs/ScrolSpy"
import { approveAdotion, sendForAdoptionSite } from "../../utils/apiCalls"
import "./dogPage.css"
import { SiDatadog } from 'react-icons/si'

const DogPage = ({ dog }) => {
    const [inheritedOpen, setInheritedOpen] = useState(false)
    const dispatch = useDispatch()

    return(
        <div className='general-body-container'>
            <GeneralBody>
                <div className="row">
                    <div className="col">
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
                        {!dog.adopted && 
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
                        }
                        { dog.adopted && 
                        <div>
                            <SiDatadog className="adopted-dog-icon"/>
                            <h5 dir="rtl" className="adopted-dog">אימצו אותי!</h5>
                        </div> 

                        }
                    </div>
                    <div className="col">
                        <h5 dir="rtl">מספר שבב: <span>{dog.details.chipNumber}</span></h5>
                        <h5 dir="rtl">גיל: <span>{dog.details.age}</span></h5>
                        <h5 dir="rtl">משקל:<span>{dog.details.weight}</span></h5>
                    </div>
                    <div className="col">
                        <h5 dir="rtl">שם: <span>{dog.details.dogName}</span></h5>
                        <h5 dir="rtl">מין: <span>{dog.details.gender}</span></h5>
                        <h5 dir="rtl">גודל: <span>{dog.details.size}</span></h5>
                    </div>
                    <div className="col">
                        <Avatar src={dog.details.src}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ScrollSpy/>
                    </div>
                    <div className="col-4">
                        <Modal title={"משימה חדשה"} modalButtonName="פתח משימה חדשה" btnType="primary">
                            <NewMission/>
                        </Modal>

                        <Modal modalButtonName="מחיקת פרופיל" btnType="danger">
                            <h3><b>?האם את/ה בטוח/ה</b></h3>
                            <div className="are-you-sure-btn-container mb-5">
                                <button className="btn btn-danger px-4">לא</button>
                                <button className="btn btn-success px-4">כן</button>
                            </div>
                        </Modal>
                    </div>
                </div>
                
            </GeneralBody>
        </div>
    )
}

export default DogPage