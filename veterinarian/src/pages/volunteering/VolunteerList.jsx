import "./volunteerlist.css"
import hand from './handlogo.png'
import { useDispatch, useSelector } from 'react-redux';
import { selectVolunteer } from "../../Redux/slicer/VolunteerSlice";
import { MdDeleteForever } from 'react-icons/md'
import { deleteVolunteer } from '../../utils/apiCalls'


const Volunteering = () => {

    const dispatch = useDispatch()
    const volunteerings = useSelector(selectVolunteer)
    return (
        <div>
            <div className="hole" />
            <div className="explaination-contianer">
                <div className="explaination-contianer-title">
                    <h1 className="vulonteertitle"> רשימת התנדבויות קיימות במאגר</h1>
                </div>
                <ul>
                    {volunteerings.map(item => {
                        return (
                            <>
                                <ul>
                                    <div className="volunteering-details-container">
                                        <div className="volunteering-details">
                                            <img className="hand-logo" src={hand} alt="icon" />

                                            <div>
                                                <h3 className="volunteering-title">{item.titleName}</h3>
                                                <p className="volunteering-descriptopn">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="hours-activity-container">
                                            <div className="hours">
                                                <div className="delete-btn-container">
                                                    <p className="mb-1">ימי פעילות:</p>
                                                    <button onClick={() => deleteVolunteer(dispatch, item)} className="delete-btn"> <MdDeleteForever className="delete-icon" /></button>
                                                </div>
                                                {item.activityHours.fromDayToDay.map((day, i) => {
                                                    if (day[1]) return (
                                                        <div className="hours-and-days">
                                                            <p className="mb-1 ms-4">{`${day[0]} - ${day[1]}`}</p>
                                                            {item.activityHours.fromHourToHour.map((hour, index) => <p className="mb-1">{index === i && `${hour[0]}-${hour[1]}`}</p>)}
                                                        </div>
                                                    )
                                                    else return (
                                                        <div className="hours-and-days">
                                                            <p className="mb-1 ms-4">{day[0]}</p>
                                                            {item.activityHours.fromHourToHour.map((hour, index) => <p className="mb-1">{index === i && `${hour[0]}-${hour[1]}`}</p>)}
                                                        </div>
                                                    )
                                                })}
                                                <p >{item.contactNum}</p>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                                <hr />
                            </>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Volunteering
