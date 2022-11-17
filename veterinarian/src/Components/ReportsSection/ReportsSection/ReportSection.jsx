import React, { useEffect, useState } from 'react'
import "./ReportSection.css"
import Report from '../Reports/Report'
import { socket } from '../../../App';
////////socket
///////
export default function ReportSection() {
    const [reports,setReports]=useState([

        {place:"first",problem:"rhwtrsthsrh  srthsrhtsrth fdsd gsgs"},
        {place:"second",problem:"srthbs fts thbsftns sthsth sh rsjtu"},
        {place:"three",problem:"h rsthsrthsrhrt s herhttrh"},
        {place:"four",problem:"rsth srths hsrt srh tsrth ty j "},
        {place:"five",problem:"h wrhr whw rhw  wrhtr hwthwj rthwr "}
    ]);
    const [reverReport,setReversReport]=useState([]);
    ////////////socket
  
  const [messageRecived,setMessageRecived]=useState("")
  // const sendM =(message, room)=>{
  //   socket.emit("send_msg",{message,room})
    
  // }
  //join room

  
  useEffect(()=>{
    socket.on("recive_msg",(data)=>{
      // setMessageRecived(data.message)
      // console.log(messageRecived?.location?.place +""+messageRecived?.reportDetails?.details);
      console.log(data.message);
      const copyReports = [...reports]
      copyReports.push({place:data.message?.location.place ,problem:data.message?.reportDetails?.details})
      
      setReports(copyReports)
      console.log(copyReports);
    })
  },[reports])
  
  ///////////////////////
  return (
    <div className='report-section'>התראות חדשות
        {
       [...reports].reverse().map((report,index)=>{
        if(index <  5)
           return(
            <Report place={report.place} problem={report.problem}/>
          )
       })
        }
    </div>
  )
}
