import Avatar from "../../Components/avatar/Avatar"
import NewMission from "../../Components/forms/NewMission/NewMission"
import GeneralBody from "../../Components/generalBody/GeneralBody"
import Modal from "../../Components/modal/Modal"
import "./dogPage.css"

const DogPage = () => {
    return(
        <div className='general-body-container'>
            <GeneralBody>
                <Modal modalButtonName="לשלוח לאימוץ?" btnType="success">
                    <h3><b>?האם את/ה בטוח/ה</b></h3>
                    <div className="are-you-sure-btn-container mb-5">
                        <button className="btn btn-danger px-4">לא</button>
                        <button className="btn btn-success px-4">כן</button>
                    </div>
                </Modal>

                <Avatar/>

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
                
            </GeneralBody>
        </div>
    )
}

export default DogPage