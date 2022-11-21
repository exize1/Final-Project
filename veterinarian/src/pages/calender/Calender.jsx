import GeneralBody from '../../Components/generalBody/GeneralBody'
import MyCalendar from "../../Components/calendar/Calendar";
import AddEvents from '../../Components/calendar/AddEvents';
import Modal from '../../Components/modal/Modal';

// import './calendar.css'

const Calendar = () => {
    return(
        <div className='general-body-container'>
            <GeneralBody actions={[<Modal addOverflow={true} footer={true} modalButtonName={"הוספת אירוע"}><AddEvents/></Modal>]} panelTitle={"לוח זמנים"}>
                <MyCalendar calendarHeight={450} toolbarDisplay={true} padding={"50px"}/>
            </GeneralBody>
        </div>
    )
}

export default Calendar