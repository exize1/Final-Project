import React, { useEffect, useState } from 'react'
import "./ReportSection.css"
import Report from '../Reports/Report'
import { socket } from '../../../App';
import { selectReport } from '../../../Redux/slicer/ReportsSlice';
import { useSelector } from 'react-redux';
////////socket
///////
export default function ReportSection() {
 
    const [report,setReport]=useState([

        // {dogDetails: {size: 'בינוני', color: 'Et sunt et qui sit a', violent: 'true'},
        //   location: {neighborhood: 'אריאל שרון', street: 'Hic enim temporibus '},
        //   lost: true,
        //   reportDetails: {details: 'Dolor perferendis ei',picture:"",time:{date: "21.11.2022", hour: "22:53"}},
        //   reporterDetails: {fullName: 'Roth Perry', email: 'amio121212@gmail.com', phone: '0505309880'},
        //   status: "reported"},
      
    ]);
    const allReports = useSelector(selectReport)

    useEffect(()=>{
      if (report.length === 0) {
        setReport(allReports)
      }
    socket.on("recive_msg",(data)=>{
      const copyReports = [...report]

      copyReports.push(data.message)
      setReport(copyReports)
      console.log(report);
    })
  },[report])
  
  return (
    <div className='report-section'> 
        <div className='title-container'>
          <p className='title'>דיווחים בזמן אמת</p>
        </div>
        <div className='report-container'>

          {
            [...report].reverse().map((report,index)=>{
          if(index <  5)
            return(
              <div className="report" >
                <Report placeNeber={report.location?.neighborhood} placeStreet={report.location?.street} problem={report.reportDetails?.details} phone={report.reporterDetails?.phone}/>
              </div>
            )
        })
        }
      </div>
    </div>
  )
}
