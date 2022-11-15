
import css from './dashboard.css'
import React from 'react';
import Button from 'react-bootstrap/Button';

const Dashboard =()=> {
  return (
  <div className='dashboard-container'>
        <div className='new-dog'>
<Button variant="info" >הוסף כלב חדש למאגר העירוני</Button>{' '}
</div>
        <div className='new-mission'>
<Button variant="info" >הוספת משימה חדשה </Button>{' '}
</div>
    <div className='logo'>
    </div>
  <div className='dashboard-hero'>
    <div className='title-class'>
  <h1>  מחלקת וטרינריה עיירית דימונה </h1>
  </div> 
    <div className='teart-pannel'>
    <h1>פאנל טיפולים</h1>
    </div>
    <div className='dog-pannel'>
    <h1>פאנל כלבים</h1>
    </div>
    <div className='report-pannel'>
    <h1>פאנל דיווחים</h1></div>
    <div className='tasks-pannel'>
    <h1>פאנל משימות</h1>
    </div>
    </div></div>
  )
}

export default Dashboard
