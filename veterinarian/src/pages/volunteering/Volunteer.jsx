import React, { useState } from 'react'
import Modal from '../../Components/modal/Modal'
import css from './volunteer.css'
import VolunteerList from './VolunteerList'
import button from 'bootstrap'


 function AddDate () {
  return (<div>
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
  <br/><p/>
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



const Volunteer = () => {
const [date, setDate] = useState(false)
  return (
    <div className='volunteer-container'>
        <h1>מערך ניהול אזור התנדבות</h1>
        <Modal modalButtonName="הוספת התנדבות חדשה" btnType="success"  size={"large"} title="הוספת התנדבות חדשה" addOverflow={true}>
         <input type="text" required={true}/> <> שם ההתנדבות</><p/>
                <input type="" required={true}/> <> מיקום ההתנדבות</><p/>
            <div className='working-houres'>
                <hr/>
                <input type="time" required={true}/> <> שעות תחילת ההתנדבות</><p/>
                <input type="time" required={true}/> <> שעות סיום ההתנדבות</><p/>

                <input list="days" name="days" placeholder='מיום' dir='rtl'/>
                <datalist id="days">
                    <option value="ראשון"/>
                    <option value="שני"/>
                    <option value="שלישי"/>
                    <option value="רביעי"/>
                    <option value="חמישי"/>
                    <option value="שישי"/>
                    <option value="שבת"/>
              </datalist>
           <br/><p/>
              <input list="days" name="days" placeholder='עד יום' dir='rtl'/>
                <datalist id="days">
                    <option value="ראשון"/>
                    <option value="שני"/>
                    <option value="שלישי"/>
                    <option value="רביעי"/>
                    <option value="חמישי"/>
                    <option value="שישי"/>
                    <option value="שבת"/>
              </datalist><p/></div>  
        
            <button type="button" className="btn btn-success" onClick={() => setDate(true)}  >הוספת שעות פעילות נוספות ליום ספציפי</button>
           <p/>
        
            {date && 
              <AddDate/>}  <hr/>  
              <input type="text" required={true}/> <> איש קשר </><p/>
            <label  for="story" dir='rtl'></label>
            <h4> פירוט כללי על ההתנדבות</h4>
         <textarea id="story" name="story"
          rows="5" cols="33">
            </textarea>
            <p/>
            <input type="button" value={"שליחת התנדבות"} />
        </Modal>
     <VolunteerList/>
        </div>
  )
}

export default Volunteer
