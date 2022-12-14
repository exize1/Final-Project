import { useEffect } from "react"
import { useState } from "react"
import { AiOutlineClose} from "react-icons/ai"
import './modal.css'

const Modal = ({ footer, dir, checkbox, title, size, addOverflow, btnType, modalButtonName, className, inheritedOpen, children,isComplites}) => {

    const [open, setOpen] = useState(false)
    
    const handleOpen = () => setOpen(true)
    
    const handleClose = () => setOpen(false)
    useEffect(() => {
            handleClose()
    }, [inheritedOpen])
    return(
        <div className='modal-container'>
            {checkbox ? <AiOutlineClose onClick={() => {handleOpen()}} style={{color: "red"}}/> : <button type="button" className={`btn btn-${btnType} ${className} responsive-btn`} onClick={() => {handleOpen()}}>{modalButtonName}</button>}
        { open &&
            <div className='modal-background'>
                <div className={`modal-fade-container ${size}`}>
                        <div dir={dir} className='modal-title-contianer modal-header'>
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button onClick={() => handleClose()} type="button" className="btn-close"></button>
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