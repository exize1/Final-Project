import { useState } from "react"

const ActivityHours = ({  handleBlur, toDay, setToDay, setFromDay, fromDay, fromHour, toHour,  setToHour, setFromHour}) => {
 
    const [isPeaked, setIsPeaked] = useState(false)

    const handlePeak = (val) => {
        setIsPeaked(true)
        setFromDay(val)
    }
    return(
    <>
    <div className="row">
        <div dir="rtl" className="dropdown col-sm-6">
            <div className="input-group mb-3 ">
                <button dir='rtl' className="btn btn-outline-secondary fromdaytoday-dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{fromDay ? fromDay : "מיום"}</button>
                <ul className="dropdown-menu scrollable-menu">
                    <li><a href="#choose-date" class="dropdown-item" dir='rtl' >בחר/י יום...</a></li>
                    <li><hr class="dropdown-divider" /></li>

                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {handlePeak("א'" )}}>{"א'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {handlePeak("ב'")}}>{"ב'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {handlePeak("ג'")}}>{"ג'"}</a></li>
                    <li><a href="#day"  className="dropdown-item" dir='rtl' onClick={() => {handlePeak("ד'")}}>{"ד'"}</a></li>
                    <li><a href="#day"className="dropdown-item" dir='rtl' onClick={() => {handlePeak("ה'")}}>{"ה'"}</a></li>
                    <li><a href="#day"className="dropdown-item" dir='rtl' onClick={() => {handlePeak("ו'")}}>{"ו'"}</a></li>
                    <li><a href="#day"className="dropdown-item" dir='rtl' onClick={() => {handlePeak("שבת")}}>{"שבת"}</a></li>
                </ul>
            </div>
        </div>
        <div dir="rtl" className="dropdown col-sm-6">
            <div className="input-group mb-3 ">
                <button dir='rtl' className="btn btn-outline-secondary fromdaytoday-dropdown dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={!isPeaked}>{toDay ? toDay : "עד יום"}</button>
                <ul className="dropdown-menu scrollable-menu">
                    <li><a href="#day" class="dropdown-item" dir='rtl' >בחר/י יום...</a></li>
                    <li><hr class="dropdown-divider" /></li>

                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("א'" )}}>{"א'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("ב'")}}>{"ב'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("ג'")}}>{"ג'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("ד'")}}>{"ד'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("ה'")}}>{"ה'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("ו'")}}>{"ו'"}</a></li>
                    <li><a href="#day" className="dropdown-item" dir='rtl' onClick={() => {setToDay("שבת")}}>{"שבת"}</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div className="row">
        <div dir='rtl' className='form-floating mb-3 col-sm-6' >
            <input name={fromHour} type="time" className="form-control input-sm" id="floatingInput" placeholder="משעה"  value={fromHour} onChange={(e) => setFromHour(e.target.value)} onBlur={handleBlur}/>
            <label htmlFor="floatingInput" >משעה</label>
        </div>
        <div dir='rtl' className='form-floating mb-3 col-sm-6' >
            <input name={toHour} type="time" className="form-control input-sm" id="floatingInput" placeholder="עד שעה"  value={toHour} onChange={(e) => setToHour(e.target.value)} onBlur={handleBlur}/>
            <label htmlFor="floatingInput" >עד שעה</label>
        </div>
    </div>
    <hr />
    </>
 )
}

export default ActivityHours