import { useEffect } from "react"
import { useState } from "react"
import './modal.css'

const Modal = ({ footer, header, title, size, addOverflow, btnType, modalButtonName, className, inheritedOpen, children}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    
    const handleClose = () => setOpen(false)
    useEffect(() => {
            handleClose()
    }, [inheritedOpen])
    return(
        <div className='modal-container'>
            <button type="button" className={`btn btn-${btnType} ${className}`} onClick={() => {handleOpen()}}>{modalButtonName}</button>
        { open &&
            <div className='modal-background'>
                <div className={`modal-fade-container ${size}`}>
                        <div className='modal-title-contianer modal-header'>
                            <button onClick={() => handleClose()} type="button" className="btn-close"></button>
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        </div>
                    <div className={addOverflow && "add-overflow"}>
                        <div className={`modal-body-contianer`}>
                            {children}
                        </div>
                    </div>
                    {footer &&
                    <div className='modal-footer-contianer modal-footer'>
                        <button onClick={() => handleClose()} type="button" className="btn btn-secondary close-btn">Close</button>
                    </div>}
                </div>
            </div>
            }
        </div>
    )
}

export default Modal