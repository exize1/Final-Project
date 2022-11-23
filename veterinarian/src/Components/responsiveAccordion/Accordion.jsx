import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { selectAssignments } from '../../Redux/slicer/Assignments'
import {  AiOutlineCheck } from "react-icons/ai"
import css from './accordion.css'



const Accordion =(props) =>{
    const assighments = useSelector(selectAssignments)
    const [open, setOpen] = useState(false)

  return (
    <div className='accordion-container' dir="rtl">
    <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id={props.id}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" onClick={() => setOpen(!open)} data-bs-target={`#anelsStayOpen${props.index}`} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    <strong> <a>שם העובד:  </a></strong> {props.name}<br/>
                </button>
            </h2>
            {open &&
            <div id={`#anelsStayOpen${props.index}`} class="accordion-collapse collapse show" aria-labelledby={props.id}>
            <div class="accordion-body">
                <strong> <a>שם העובד:  </a>{props.name}<br/> 
                <a>מספר שיבוב : </a>{props.title}</strong><br/>
                <a>תאריך  : </a> {props.dateUpload} <br/>
                <a>תאריך יעד : </a> {props.dateToEnd} <br/>
                <a>תיאור משימה :</a>{props.descreption}<br/>{props.complited} 
                
            </div>
            </div>
            
            }  
             </div>
        </div>
    </div>
  
  

  )
}

export default Accordion