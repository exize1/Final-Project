import GeneralBody from '../../Components/generalBody/GeneralBody'
import ScrolSpyAssignments from '../../Components/scrollSpy/Assignments/ScrolSpyAssignments'
import './Assignments.css'

const Assignments = () => {
    return(
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל משימות"}>
             
            <ScrolSpyAssignments></ScrolSpyAssignments>
            </GeneralBody>
        </div>
    )
}

export default Assignments