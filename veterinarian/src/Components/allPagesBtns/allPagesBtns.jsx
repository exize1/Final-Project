import Modal from '../modal/Modal';
import NewDogForm from '../forms/NewDogForm/NewDogForm';
import NewMission from '../forms/NewMission/NewMission';
import "./allPagesBtns.css"  

const AllPagesBtns = ( ) => {
 return(
    <>
    <div className='new-mission mb-1'>
        <Modal addOverflow={true} modalButtonName={"משימה חדשה"}  className="add-new-dog-btn" footer={true} size="medium" title="הוספת משימה חדשה">
            <input required={true} type={"text"} dir="rtl" placeholder="סוג משימה :" /><p />
            <hr /><label>תאריך סיום </label> <br />
            <input required={true} type={"date"} /><p /><hr />
            <label>תמונה </label> <br />
            <input required={false} type={"file"} /><p /><hr />
            <input required={true} type={"text"} dir="rtl" placeholder="שם העובד המבצע " /><p />
            <input required={true} type={"submit"} /><p />
            <NewMission/>
        </Modal>
    </div>
    <div className='new-dog'>
        <Modal addOverflow={true} modalButtonName={"כלב חדש "}  className="add-new-dog-btn" footer={true} size="large" title="הוספת כלב חדש למאגר העירוני">
            <NewDogForm></NewDogForm>
        </Modal>
    </div>
    </>
 )
}

export default AllPagesBtns