import './generalBody.css'
import Modal from '../../Components/modal/Modal';
import NewDogForm from '../forms/NewDogForm/NewDogForm';

const GeneralBody = ({ panelTitle, addOverFlow, children }) => {
    return (
        <div className='general-body' >
            <h1>{panelTitle}</h1>
            <div className={addOverFlow ? 'add-overflow children-container' : 'children-container'}>
                {children}
            </div>
            <div className='new-dog'>
                <Modal addOverflow={true} modalButtonName={"הוסף כלב חדש למאגר העירוני"} btnType="success" footer={true} size="large" title="הוספת כלב חדש למאגר העירוני">
                    <NewDogForm></NewDogForm>
                </Modal>
            </div>
            <div className='new-mission'>
                <Modal modalButtonName={"הוספת משימה חדשה"} btnType="success" footer={true} size="medium" title="הוספת משימה חדשה">
                    <input required={true} type={"text"} dir="rtl" placeholder="סוג משימה :" /><p />
                    <hr /><label>תאריך סיום </label> <br />
                    <input required={true} type={"date"} /><p /><hr />
                    <label>תמונה </label> <br />
                    <input required={false} type={"file"} /><p /><hr />
                    <input required={true} type={"text"} dir="rtl" placeholder="שם העובד המבצע " /><p />
                    <input required={true} type={"submit"} /><p />
                </Modal>
            </div>
        </div >
    )
}

export default GeneralBody