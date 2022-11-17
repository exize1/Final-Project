
import './dashboard.css'
import React from 'react';
import {Link} from 'react-router-dom'
import GeneralBody from '../../Components/generalBody/GeneralBody';

const Dashboard =()=> {
  return (
    <div className='dashboard-container'>
      <div className='logo'/>
      <GeneralBody panelTitle={"מחלקת וטרינריה עיירית דימונה"} removeUpperBg={true}>
        <div className='hero'>
          <div className='lines-container'>
            <div className='teart-pannel'>
              <h1>פאנל טיפולים</h1>
            </div>
            <Link to= {"/adoption"}>
              <div className='dog-pannel'>
                <h1>פאנל כלבים</h1>
              </div>
            </Link>
          </div>

          <div className='lines-container'>
            <Link  to= {"/reports"}>
              <div className='report-pannel'>
                <h1>פאנל דיווחים</h1>
              </div>
            </Link>
            <div className='tasks-pannel'>
              <h1>פאנל משימות</h1>
            </div>
          </div>
        </div>
      </GeneralBody>
    </div>
  )
}

export default Dashboard
