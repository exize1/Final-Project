import "./volunteerlist.css"
import hand from './handlogo.png'
import { useEffect, useState } from "react"
import { getVolunteers } from "../../utils/apiCalls"
import { useDispatch, useSelector } from 'react-redux';
import { selectVolunteer } from "../../Redux/slicer/VolunteerSlice";


const Volunteering = () => {

    // const volunteerList = [
    //     {
    //         title: "מתן עזרה לרופאי יחידת החילוץ",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["א'-ה' 09:00-13:00", "שישי 13:00-16:00", "שבת 12:00 -15:00"]
    //     },
    //     {
    //         title: "טיול עם הכלבים",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["א'-ש' 09:00-13:00"]
    //     },
    //     {
    //         title: "פעילות חינוכית עם הקהילה",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["שישי 13:00-16:00", "שבת 12:00 -15:00"]
    //     },
    //     {
    //         title: "לקיחת חלק בהקמת ימי אימוץ",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["שבת 11:00 -16:00"]
    //     },
    //     {
    //         title: "מתן עזרה לרופאי יחידת החילוץ",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["א'-ה' 09:00-13:00", "שישי 13:00-16:00", "שבת 12:00 -15:00"]
    //     },
    //     {
    //         title: "טיול עם הכלבים",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["א'-ש' 09:00-13:00"]
    //     },
    //     {
    //         title: "פעילות חינוכית עם הקהילה",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["שישי 13:00-16:00", "שבת 12:00 -15:00"]
    //     },
    //     {
    //         title: "לקיחת חלק בהקמת ימי אימוץ",
    //         descriptopn: "ישנם התנדבויות רבות של עולם שלם ונותן הכלת לכולם וכל עוד אתה ממשיך אין עוד מספיק ואיתו יחד כולנו שם ומתי זה יפזיק אין יודע ואים יודעים ולמה שלא נמשיך כי אפשר יותר ואז מפסיק ועוד לא נגמרת ככל שיש יותר גס בהל דכהל ד כהםד זדשלךח גךלכחדםבח קררןדה דןל כהןםדה כגםדןד גמבקררי דגטבנ גדוחי כגחהט'וש גבשקג כבקושחגד",
    //         activityHours: ["שבת 11:00 -16:00"]
    //     },
    // ]
useEffect(()=> {
    getVolunteers(dispatch)
}, [])
const dispatch = useDispatch()

    const volunteerings = useSelector(selectVolunteer)
    console.log(volunteerings);
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
