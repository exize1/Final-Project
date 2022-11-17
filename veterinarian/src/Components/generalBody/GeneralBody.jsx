import './generalBody.css'
import Modal from '../../Components/modal/Modal';

const GeneralBody = ({panelTitle, addOverFlow, removeUpperBg, children}) => {
    return(
        <div className={!removeUpperBg && 'general-body'}>
            <h1>{panelTitle}</h1>
            <div className={addOverFlow ? 'add-overflow children-container' : 'children-container'}>
                {children}
            </div>
            <div className='new-dog'>
                <Modal modalButtonName={"הוסף כלב חדש למאגר העירוני"} btnType="secondary" footer={true} size="medium" title="הוספת כלב חדש למאגר העירוני">
                    <input required={true} type={"text"}  dir ="rtl" placeholder="שם הכלב :"/><p/>
                    <input required={true} type={'number'} dir ="rtl" placeholder="משקל הכלב :"/><p/>
                    <input required={true} type={"number"}  dir ="rtl" placeholder="גיל הכלב:"/><p/>
                    <input required={true} type={"text"}  dir ="rtl" placeholder="מין:"/><p/>
                    <input required={false} type={"text"}  dir ="rtl" placeholder="סוגי טיפולים שעבר:"/><p/>
                    <input required={true} type={"text"}  dir ="rtl" placeholder="גודל:"/><p/>
                    <input required={true} type={"submit"}  dir ="rtl" /><p/>
                    {/* <input type={""} */}
                </Modal>
            </div>
            <div className='new-mission'>
                <Modal modalButtonName={"הוספת משימה חדשה"} btnType="secondary" footer={true} size="medium" title="הוספת משימה חדשה">
                <input required={true} type={"text"}  dir ="rtl" placeholder="סוג משימה :"/><p/>
                <hr/><label>תאריך סיום </label> <br/>
                <input required={true} type={"date"}  /><p/><hr/>
                <label>תמונה </label> <br/>
                <input required={false} type={"file"} /><p/><hr/>
                <input required={true} type={"text"}  dir ="rtl" placeholder="שם העובד המבצע "/><p/>
                <input required={true} type={"submit"}  /><p/>
                </Modal>
            </div>
        </div>
    )
}

export default GeneralBody