import React, { useState } from 'react'
import NewVolunteering from '../../Components/forms/NewVolunteering/NewVolunteering'
import Modal from '../../Components/modal/Modal'
import './volunteer.css'
import VolunteerList from './VolunteerList'



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
