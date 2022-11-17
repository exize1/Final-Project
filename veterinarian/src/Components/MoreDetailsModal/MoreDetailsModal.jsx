import { useState } from "react"
import './moreDetailsModal.css'

const MoreDetailsModal = ({ title, size, addOverflow, btnType, modalButtonName, className, body, children, time }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const dateTime = time
    const SplittedDateTime = dateTime.split('T')
    const onlyTime = SplittedDateTime[1];
    const removeHyphen = SplittedDateTime[0].split("-")
    const dotsInDate = removeHyphen.join(".")


    return (
        <div className='modal-container'>
            <button type="button" className={`btn btn-${btnType} ${className}`} onClick={() => { handleOpen() }}>{modalButtonName}</button>
            {open &&
                <div className='modal-background'>
                    <div className={`modal-fade-container ${size}`}>
                        <div className='modal-title-contianer modal-header'>
                            <h5 className="modal-title" id="exampleModalLabel" dir="rtl">{title}</h5>
                            <button onClick={() => handleClose()} type="button" className="btn-close"></button>
                        </div>
                        <div className={addOverflow}>
                            <div className={`modal-body-contianer`}>
                                {children}
                            </div>
                        </div>
                        <div className='modal-footer-contianer modal-footer'>
                            <div dir="">{dotsInDate}, {onlyTime}
                                <span dir="rtl" className="ms-2"> דווח בזמן: </span>
                            </div>
                            <button onClick={() => handleClose()} type="button" className="btn btn-secondary close-btn">סגור</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MoreDetailsModal