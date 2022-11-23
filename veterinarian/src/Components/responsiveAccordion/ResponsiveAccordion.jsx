
import React from 'react'
import Accordion from './Accordion'
import {useSelector} from 'react-redux'
import { selectAssignments } from '../../Redux/slicer/Assignments'



function ResponsiveAccordion(props) {
const assighments = useSelector(selectAssignments)
  return (
    <div>
        {assighments.map((assigment,index)=>{
            return(
<Accordion name={assigment.dogHandlerName} title={assigment. dogNumber} index={index} dateUpload={assigment.dateUpload} dateToEnd={assigment.dateToEnd} descreption={assigment.details} complited={assigment.complited}></Accordion>

            )
        })}

    </div>
  )
}

export default ResponsiveAccordion