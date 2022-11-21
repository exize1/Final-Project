import "./volunteerlist.css"
import hand from './handlogo.png'
import { useEffect, useState } from "react"
import { getVolunteers } from "../../utils/apiCalls"
import { useDispatch, useSelector } from 'react-redux';
import { selectVolunteer } from "../../Redux/slicer/VolunteerSlice";
import {MdDeleteForever} from 'react-icons/md'
import {deleteVolunteer} from '../../utils/apiCalls'


const Volunteering = () => {

// useEffect(()=> {
//     getVolunteers(dispatch)
// }, [])]

    const dispatch = useDispatch()
    const volunteerings = useSelector(selectVolunteer)
    return(
        <div>
            <div className="hole"/>
            <div className="explaination-contianer">
                <h1 className="vulonteertitle"> רשימת התנדבויות קיימות במאגר</h1>
                 <ul>
                {volunteerings.map(item => {
                    return(
                        <>
                        <ul>
                            <div className="volunteering-details-container">
                                <div className="volunteering-details">
                                    <img className="hand-logo"src={hand} alt="icon"/>
                                  
                                    <div>
                                        <h3 className="volunteering-title">{item.titleName}</h3>
                                        <p className="volunteering-descriptopn">{item.description}</p>
                                    </div>
                                </div>
                                <button onClick={()=> deleteVolunteer(dispatch,item)} className="delete-btn"> <MdDeleteForever size={"40px"} color={"tomato"}/>  מחיקת התנדבות מהמאגר</button>
                                <div className="hours">
                                    <p>ימי פעילות:</p>
                                    <p>{item.activityHours.fromDayToDay.map(item => <p>{item[0]+"-"+item[1]}</p>)}</p>
                                    <p>{item.activityHours.fromHourToHour.map(item => <p>{item[0]+"-"+item[1]}</p>)}</p>
                                    <p >{item.contactNum}</p>
                                    
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
