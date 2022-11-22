import MyCalendar from "../../Components/calendar/Calendar";

import './dashboard.css'
import React from 'react';
import {Link} from 'react-router-dom'
import ReportSection from "../../Components/ReportsSection/ReportsSection/ReportSection";

import Assigment from "../../Components/assignmentsSection/assignments/Assigment";
import AssigmentSection from "../../Components/assignmentsSection/AssignmentSection/AssignmentSection";
import AssignmentSection from "../../Components/assignmentsSection/AssignmentSection/AssignmentSection";
import { useDispatch, useSelector } from "react-redux";
import { selectAssignments } from "../../Redux/slicer/Assignments";
import { useState } from "react";
import { selectUser } from "../../Redux/slicer/UserSlice";
import { useEffect } from "react";
import { gotTheAlert } from "../../utils/apiCalls";

const Dashboard =()=> {

  const [newAssignment, setNewAssignment] = useState(false)
  const myAssignments = useSelector(selectAssignments)
  const userData = useSelector(selectUser)

  const dispatch = useDispatch()
  useEffect(() => {
    const findNewAssignment = () => {
      myAssignments.forEach(item => {
        item.dogHandlerID === userData._id && item.isNewAssignment && setNewAssignment(true)
      })
    }

    findNewAssignment()
  }, [userData._id, myAssignments])

  return (
    <div className='dashboard-container '>
      <div className='logo-container'>
        <div className="assignment-alert-container"> 
          {/* <Link className="remove-underline"  to= {"/assignments"}> */}
            <div onClick={() => gotTheAlert(dispatch, userData, setNewAssignment)} className={`alert alert-warning assignment-alert right-to-left `} role="alert" hidden={!newAssignment}>
               שים לב! קיבלת משימה חדשה
            </div>
          {/* </Link> */}
        </div>
        <div className="logo-title-container">
          <h1 className="main-title">כלביית דימונה</h1>
          <div className='logo'/>
        </div>
      </div>
        <div className="calendar-container">
          <div className="calendar">
            <MyCalendar  calendarHeight={300}  toolbarDisplay={false} fontDashbordsize={"0.55rem"} minWidthDash={"300px"} margincalendar={5}/>
          </div>
        </div>

      <div className='hero '>
        <div className='lines-container'>

        <Link className="remove-underline" to= {"/volunteering"}>
          <div className="pannel-container">
            <div className='pannel teart-btn'>
              <div className="pannel-title-container">
                <h1 className="pannel-title">פאנל התנדבויות</h1>
              </div>
            </div>
          </div>
        </Link>

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
