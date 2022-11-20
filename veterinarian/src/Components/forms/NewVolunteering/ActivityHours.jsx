const ActivityHours = ({ handleChange, handleBlur, values, toDay, setToDay, setFromDay, fromDay }) => {
 return(
    <>
    <div dir="rtl" className="dropdown col-sm">
        <div className="input-group mb-3 me-5">
            <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{fromDay ? fromDay : "מיום"}</button>
            <ul className="dropdown-menu scrollable-menu">
                <li><a class="dropdown-item" dir='rtl' >בחר/י יום...</a></li>
                <li><hr class="dropdown-divider" /></li>

                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("א'" )}}>{"א'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("ב'")}}>{"ב'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("ג'")}}>{"ג'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("ד'")}}>{"ד'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("ה'")}}>{"ה'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("ו'")}}>{"ו'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("שבת")}}>{"שבת"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setFromDay("אחר")}}>{"אחר"}</a></li>
            </ul>
        </div>
    </div>
    <div dir="rtl" className="dropdown col-sm">
        <div className="input-group mb-3 me-5">
            <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{toDay ? toDay : "עד יום"}</button>
            <ul className="dropdown-menu scrollable-menu">
                <li><a class="dropdown-item" dir='rtl' >בחר/י יום...</a></li>
                <li><hr class="dropdown-divider" /></li>

                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("א'" )}}>{"א'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("ב'")}}>{"ב'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("ג'")}}>{"ג'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("ד'")}}>{"ד'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("ה'")}}>{"ה'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("ו'")}}>{"ו'"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("שבת")}}>{"שבת"}</a></li>
                <li><a className="dropdown-item" dir='rtl' onClick={() => {setToDay("אחר")}}>{"אחר"}</a></li>
            </ul>
        </div>
    </div>
    <div dir='rtl' className='form-floating mb-3 col-sm-3' >
        <input name="fromHour" type="time" className="form-control input-sm" id="floatingInput" placeholder="משעה"  value={values.fromHour} onChange={handleChange} onBlur={handleBlur}/>
        <label htmlFor="floatingInput" >משעה</label>
    </div>
    <div dir='rtl' className='form-floating mb-3 col-sm-3' >
        <input name="toHour" type="time" className="form-control input-sm" id="floatingInput" placeholder="עד שעה"  value={values.toHour} onChange={handleChange} onBlur={handleBlur}/>
        <label htmlFor="floatingInput" >עד שעה</label>
    </div>
    </>
 )
}

export default ActivityHours