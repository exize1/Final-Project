import React from 'react'
import "./Report.css"
export default function Report(props) {
  return (
    <div dir='rtl' className='complet-report'>
      <div className='text-report'onClick={()=>window.open(`https://maps.google.com?q=${props.placeNeber} ${props.placeStreet}`)}>
        <b>מיקום :</b>
          {props.placeNeber}-{props.placeStreet}
        <div >
          </div>
      </div>
      <div className='text-report'>
        <b>דיווח:</b> {props.problem}
      </div>
      <div className="phone">
      <a href={`tel:${props.phone}`}>({props.phone})</a>
      
      </div>
    </div>
  )
}
