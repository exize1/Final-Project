import GeneralBody from '../../Components/generalBody/GeneralBody'
import ResponsiveAccordion from '../../Components/responsiveAccordion/ResponsiveAccordion'
import ScrolSpyAssignments from '../../Components/scrollSpy/Assignments/ScrolSpyAssignments'
import './Assignments.css'

const Assignments = () => {
    let windowWidth=window.innerWidth
    
    return(
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל משימות"} addOverFlow={true}>
              {windowWidth > 900 ? <ScrolSpyAssignments/> :<ResponsiveAccordion  />}
            </GeneralBody>
        </div>
    )
}

export default Assignments