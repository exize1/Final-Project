import React from 'react'
import "./Report.css"
export default function Report(props) {
  return (
    <div className='complet-report'>
    <div className='text-report'>
      מיקום :{props.place}
    </div>
    <div className='text-report'>
      בעיה: {props.problem}
    </div>
    </div>
  )
}
