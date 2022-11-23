import Modal from '../modal/Modal';
import NewDogForm from '../forms/NewDogForm/NewDogForm';
import NewMission from '../forms/NewMission/NewMission';
import "./allPagesBtns.css"  
// import AddEvents from '../calendar/AddEvents';

const AllPagesBtns = ( {className} ) => {
 return(
    <>
    <div className={`new-mission mb-1 `}>
        <Modal addOverflow={true} modalButtonName={"משימה חדשה"}  className="add-new-dog-btn" footer={true} size="medium" title="הוספת משימה חדשה">
            <NewMission/>
        </Modal>
    </div>
    <div className={`new-dog ${className}`}>
        <Modal addOverflow={true} modalButtonName={"כלב חדש "}  className="add-new-dog-btn" footer={true} size="large" title="הוספת כלב חדש למאגר העירוני">
            <NewDogForm/>
        </Modal>
    </div>

    </>
 )
}

export default AllPagesBtns