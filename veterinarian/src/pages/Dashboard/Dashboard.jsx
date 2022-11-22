import MyCalendar from "../../Components/calendar/Calendar";

import './dashboard.css'
import React from 'react';
import {Link} from 'react-router-dom'
import ReportSection from "../../Components/ReportsSection/ReportsSection/ReportSection";
import Assigment from "../../Components/assignmentsSection/assignments/Assigment";
import AssigmentSection from "../../Components/assignmentsSection/AssignmentSection/AssignmentSection";
import AssignmentSection from "../../Components/assignmentsSection/AssignmentSection/AssignmentSection";

const Dashboard =()=> {
  return (
    <div className='dashboard-container '>
      <div className='logo-container'>
        <h1 className="main-title">כלביית דימונה</h1>
        <div className='logo'/>
      </div>
        <div className="calendar-container">
          <div className="calendar">
            <MyCalendar  calendarHeight={300}  toolbarDisplay={false} fontDashbordsize={"0.55rem"} minWidthDash={"300px"} margincalendar={5}/>
          </div>
        </div>

      <div className='hero '>
        <div className='lines-container'>

          <div className="pannel-container">
            <div className='pannel teart-btn'>
              <div className="pannel-title-container">
                <h1 className="pannel-title">פאנל טיפולים</h1>
              </div>
            </div>
          </div>

          <Link className="remove-underline" to= {"/adoption"}>
            <div className="pannel-container">
              <div className='pannel dog-btn'>
                <div className="pannel-title-container">
                  <h1 className="pannel-title">פאנל כלבים</h1>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className='lines-container'>
          
          <Link className="remove-underline"  to= {"/reports"}>
            <div className="pannel-container">
              <div className='pannel report-btn'>
                <div className="pannel-title-container">
                  <h1 className="pannel-title">פאנל דיווחים</h1>
                </div>
              </div>
            </div>
          </Link>
          
          <Link className="remove-underline"  to= {"/assignments"}>
          <div className="pannel-container">
            <div className='pannel tasks-btn'>
              <div className="pannel-title-container">
                <h1 className="pannel-title">פאנל משימות</h1>
              </div>
            </div>
          </div>
          </Link>

        </div>
      </div>
      <div className="reports-in-realtime-container">
        <ReportSection />
        <div className="assighments-container">
          <h1></h1>
          <AssignmentSection/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
