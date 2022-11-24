// import React, { useEffect, useState } from 'react'
import "./AssignmentSection.css"
import Assigment from '../assignments/Assigment'
// import { socket } from '../../../App';
import { selectAssignments } from '../../../Redux/slicer/Assignments';
import { selectUser } from '../../../Redux/slicer/UserSlice';
import { useSelector } from 'react-redux';
////////socket
///////
export default function AssignmentSection() {
    // const [reports,setReports]=useState([
     
    //     {place:"first", phone: "053-2597316", problem:"rhwtrsthsrh  srthsrhtsrth fdsd gsgs"},
    //     {place:"second", phone: "053-2597316", problem:"srthbs fts thbsftns sthsth sh rsjtu"},
    //     {place:"three", phone: "053-2597316", problem:"h rsthsrthsrhrt s herhttrh"},
    //     {place:"four", phone: "053-2597316", problem:"rsth srths hsrt srh tsrth ty j "},
    //     {place:"five", phone: "053-2597316", problem:"h wrhr whw rhw  wrhtr hwthwj rthwr "}
    // ]);
    const assignments = useSelector(selectAssignments)
    console.log(assignments);
    const user = useSelector(selectUser)
    // const [reverReport,setReversReport]=useState([]);
    ////////////socket
  
  // const [messageRecived,setMessageRecived]=useState("")
  // const sendM =(message, room)=>{
  //   socket.emit("send_msg",{message,room})
    
  // }
  //join room

  
  // useEffect(()=>{
  //   socket.on("recive_msg",(data)=>{
  //     // setMessageRecived(data.message)
  //     // console.log(messageRecived?.location?.place +""+messageRecived?.reportDetails?.details);
  //     console.log(data.message);
  //     const copyReports = [...reports]
  //     copyReports.push({place:data.message?.location.place ,problem:data.message?.reportDetails?.details})
      
  //     setReports(copyReports)
  //     console.log(copyReports);
  //   })
  // },[reports])
  
  ///////////////////////
  return (
    <div className='report-section'> 
        <div className='title-container'>
          <p className='title'>משימות חדשות</p>
        </div>
        <div className='report-container'>

          {
            [...assignments].reverse().map((assignment,index)=>{
              if (!assignment.complited && assignment.dogHandlerID===user._id) {
                if(index <  5)
                  return(
                    <div className="report" >
                      <Assigment key={index}userID={user._id} assignmentID={assignment._id} complited={assignment.complited} workerName={assignment.dogHandlerName} assignment={assignment.details} dateToFinish={assignment.dateToEnd}/>
                    </div>
                  )
                }
                return console.log();
        })
        }
      </div>
    </div>
  )
}
