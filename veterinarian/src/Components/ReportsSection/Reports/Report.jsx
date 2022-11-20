import React from 'react'
import "./Report.css"
export default function Report(props) {
  return (
    <div dir='rtl' className='complet-report'>
      <div className='text-report'>
        <b>מיקום :</b>{props.place}
      </div>
      <div className='text-report'>
        <b>דיווח:</b> {props.problem}
      </div>
      <div className="phone">
      ({props.phone})
      </div>
    </div>
  )
}
