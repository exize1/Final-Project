
import css from './dashboard.css'
import React from 'react';
import {Link} from 'react-router-dom'
import DogPage from '../../pages/DogPage/DogPage';
import Modal from '../modal/Modal';

const Dashboard =()=> {
  return (
  <div className='dashboard-container'>
        <div className='new-dog'>
{/* <button className='btn btn-success' >הוסף כלב חדש למאגר העירוני</button>{' '} */}
<Modal modalButtonName={"הוסף כלב חדש למאגר העירוני"} btnType="success" footer={true} size="medium" title="הוספת כלב חדש למאגר העירוני">
  <input required={true} type={"text"}  dir ="rtl" placeholder="שם הכלב :"/><p/>
  <input required={true} type={'number'} dir ="rtl" placeholder="משקל הכלב :"/><p/>
  <input required={true} type={"number"}  dir ="rtl" placeholder="גיל הכלב:"/><p/>
  <input required={true} type={"text"}  dir ="rtl" placeholder="מין:"/><p/>
  <input required={false} type={"text"}  dir ="rtl" placeholder="סוגי טיפולים שעבר:"/><p/>
  <input required={true} type={"text"}  dir ="rtl" placeholder="גודל:"/><p/>
  <input required={true} type={"submit"}  dir ="rtl" /><p/>
  {/* <input type={""} */}
  
   </Modal>
</div>
        <div className='new-mission'>
{/* <button className='btn btn-success'  >הוספת משימה חדשה </button>{' '} */}
<Modal modalButtonName={"הוספת משימה חדשה"} btnType="success" footer={true} size="medium" title="הוספת משימה חדשה">
 <input required={true} type={"text"}  dir ="rtl" placeholder="סוג משימה :"/><p/>
 <hr/><label>תאריך סיום </label> <br/>
 <input required={true} type={"date"}  /><p/><hr/>
 <label>תמונה </label> <br/>
 <input required={false} type={"file"} /><p/><hr/>
 <input required={true} type={"text"}  dir ="rtl" placeholder="שם העובד המבצע "/><p/>
 <input required={true} type={"submit"}  /><p/>
</Modal>
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
    <Link to= {"/adoption"}>
    <div className='dog-pannel'>
    <h1>פאנל כלבים</h1>
    </div></Link>
    <Link  to= {"/appointments"}>
    <div className='report-pannel'>
    <h1>פאנל דיווחים</h1></div>
    </Link>
    <div className='tasks-pannel'>
    <h1>פאנל משימות</h1>
    </div>
    </div></div>
  )
}

export default Dashboard
