import React, { useState } from 'react'
import './accordion.css'



const Accordion =(props) =>{
    const [open, setOpen] = useState(false)

  return (
    <div className='accordion-container' dir="rtl">
    <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id={props.id}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" onClick={() => setOpen(!open)} data-bs-target={`#anelsStayOpen${props.index}`} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    <strong> <a href='#name'>שם העובד:  </a></strong> {props.name}<br/>
                </button>
            </h2>
            {open &&
            <div id={`#anelsStayOpen${props.index}`} class="accordion-collapse collapse show" aria-labelledby={props.id}>
                <div class="accordion-body">
                    <strong> <a href='#name'>שם העובד:  </a>{props.name}<br/> 
                    <a href='#chip'>מספר שיבוב : </a>{props.title}</strong><br/>
                    <a href='#date'>תאריך  : </a> {props.dateUpload} <br/>
                    <a href='#dateDestnion'>תאריך יעד : </a> {props.dateToEnd} <br/>
                    <a href='#misstion'>תיאור משימה :</a>{props.descreption}<br/>{props.complited} 
                </div>
            </div>
            
            }  
             </div>
        </div>
    </div>
  
  

  )
}

export default Accordion