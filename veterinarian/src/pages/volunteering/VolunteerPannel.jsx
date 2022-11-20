import React, { useState } from 'react'
import NewVolunteering from '../../Components/forms/NewVolunteering/NewVolunteering'
import Modal from '../../Components/modal/Modal'
import './volunteer.css'
import VolunteerList from './VolunteerList'


 function AddDate () {
  return (
  <div>
    <input list="days" name="days" placeholder='מיום ' dir='rtl'/>
      <datalist id="days">
          <option value="ראשון"/>
          <option value="שני"/>
          <option value="שלישי"/>
          <option value="רביעי"/>
          <option value="חמישי"/>
          <option value="שישי"/>
          <option value="שבת"/>
    </datalist>
    <br/>  <p/>

    <input list="days" name="days" placeholder='עד יום' dir='rtl'/>
      <datalist id="days">
          <option value="ראשון"/>
          <option value="שני"/>
          <option value="שלישי"/>
          <option value="רביעי"/>
          <option value="חמישי"/>
          <option value="שישי"/>
          <option value="שבת"/>
    </datalist>
  <p/>
    <input type="time" required={true}/> <> שעות תחילת ההתנדבות</><p/>
    <input type="time" required={true}/> <> שעות סיום ההתנדבות</><p/>
  </div> )
}



const VolunteerPannel = () => {
const [date, setDate] = useState(false)
  return (
    <div className='volunteer-container'>
      <h1>מערך ניהול אזור התנדבות</h1>
      <NewVolunteering/>
      <VolunteerList/>
    </div>
  )
}

export default VolunteerPannel
