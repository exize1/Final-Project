import Avatar from "../../Components/avatar/Avatar"
import NewMission from "../../Components/forms/NewMission/NewMission"
import GeneralBody from "../../Components/generalBody/GeneralBody"
import Modal from "../../Components/modal/Modal"
import ScrollSpy from "../../Components/scrollSpy/ScrolSpy"
import "./dogPage.css"

const DogPage = () => {
    return(
        <div className='general-body-container'>
            <GeneralBody>
                <div className="row">
                    <div className="col">
                        <Modal modalButtonName="לשלוח לאימוץ?" btnType="success">
                            <h3><b>?האם את/ה בטוח/ה</b></h3>
                            <div className="are-you-sure-btn-container mb-5">
                                <button className="btn btn-danger px-4">לא</button>
                                <button className="btn btn-success px-4">כן</button>
                            </div>
                        </Modal>
                    </div>
                    <div className="col">
                        <h5 dir="rtl">מספר שבב:</h5>
                        <h5 dir="rtl">גיל:</h5>
                        <h5 dir="rtl">משקל:</h5>
                    </div>
                    <div className="col">
                        <h5 dir="rtl">שם:</h5>
                        <h5 dir="rtl">מין:</h5>
                        <h5 dir="rtl">גודל:</h5>
                    </div>
                    <div className="col">
                        <Avatar/>
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