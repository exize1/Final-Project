import React , { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from './Popping';
import {closeEvent, ShowEventApi, ShowEventsApi} from "../../Redux/actions"
import { connect } from 'react-redux'
import he from 'date-fns/locale/he'
const locales = {
  he: he,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})





const MyCalendar = ({events, padding, ShowEventApi, closeEvent, ShowEventsApi,calendarHeight,margincalendar,fontDashbordsize,minWidthDash,toolbarDisplay}) => {
    const [open, setOpen] = useState(false);
    const [renderStatus, rerender] = useState(false);

    // useEffect(()=>{
    //   ShowEventsApi()
    //   console.log("i renderd because of refresh or start");
    // },[])


    useEffect(()=>{
      ShowEventsApi()
      console.log("i renderd");
    },[renderStatus,ShowEventsApi])
   

    const openEventClick = (event)=>{
         setOpen(true)
         if(event.id) {
          ShowEventApi( event.id);
         }
         
         return;
    }

    const closeEventClick = () =>{
      setOpen(false);
      setTimeout(()=>closeEvent(),300) ;
    }
    
    return (
    <div>
        <Popping open={open}
         handleOpen={openEventClick} 
         handleClose={closeEventClick} 
         renderStatus = {renderStatus} 
         rerender= {rerender}/>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height:calendarHeight, fontSize:fontDashbordsize, minWidth:minWidthDash, background:"white" , marginRight:margincalendar, marginLeft:margincalendar, direction:"rtl", fontFamily:'Patrick Hand', paddingTop:padding}}
            onSelectEvent={openEventClick}
            toolbar={toolbarDisplay}
            culture="he"
            messages={{
              next:"הבא",
              previous:"הקודם",
              today:"היום",
              month:"חודש",
              week:"שבוע",
              day:"יום",
              agenda:"רשימה"
          }}
        />
    </div>
    )
}

function mapStateToProps({event, events}){
  return{
    event,
    events
  }
}

export default connect(mapStateToProps, {ShowEventApi, closeEvent, ShowEventsApi})(MyCalendar)