import React, { useState } from 'react'
// import { AiOutlineCheck } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
// import { selectAssignments } from '../../../Redux/slicer/Assignments'
import { finishAssignment } from '../../../utils/apiCalls'
import Modal from '../../modal/Modal'
import "./Assigment.css"
export default function Assigment(props) {
  // const assignments = useSelector(selectAssignments)
  const dispatch = useDispatch()
  const [inheritedOpen, setInheritedOpen] = useState(false)

  return (
    <div dir='rtl' className='complet-report'>
      <div className='text-report'>
        <b>עובד :</b>{props.workerName}
      </div>
      <div className='text-report withCheck'>
        <div>

        <b>משימה:</b> {props.assignment}
        </div>
        {      
                 <Modal checkbox={true} modalButtonName="משימה בוצעה?" inheritedOpen={inheritedOpen} >
                  <h3><b>?האם את/ה בטוח/ה</b></h3>
                 <div className="are-you-sure-btn-container mb-5">
                 <button className="btn btn-danger px-4" onClick={() => setInheritedOpen(!inheritedOpen)}>לא</button>
                 <button className="btn btn-success px-4" onClick={() => {
                  // sendForAdoptionSite(dispatch, dog)
                  finishAssignment(dispatch,props.assignmentID,props.userID)
                  setInheritedOpen(!inheritedOpen)
                  }}>כן</button>
                  </div>
                </Modal>
        }       
      </div>
      <div className="phone">
      <b>תאריך סיום:</b>({props.dateToFinish})
      </div>
    </div>
  )
}
