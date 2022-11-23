import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDog } from "../../utils/apiCalls";
import Modal from "../modal/Modal";

const DeleteBtn = ({ dog, btnType, className }) => {
    const [inheritedOpen, setInheritedOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    return(
        <div className="delete-dog-button-container">
            <Modal  modalButtonName="מחיקת פרופיל" btnType={btnType} className={className} inheritedOpen={inheritedOpen}>
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
    )
}

export default DeleteBtn