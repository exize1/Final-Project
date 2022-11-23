import './generalBody.css'
import AllPagesBtns from '../allPagesBtns/allPagesBtns';
import { useState } from 'react';
import { BsPlusLg } from "react-icons/bs"

const GeneralBody = ({panelTitle, addOverFlow, removeUpperBg, children, actions}) => {
    const [open, setOpen] = useState(false)
    let windoWidth = window.innerWidth;

    return(
        <>
        <div className={!removeUpperBg && 'general-body'}>

            <div className={'children-container'}>
                <div className={addOverFlow ? "add-overflow  children" : 'children'}>
                    {children}
                </div>
            </div>
            {windoWidth > 900 && <div className='movebar-container'>
                <div className='movebar'>
                    <h3 className='panel-title mt-3'>{panelTitle}</h3>
                    <div dir='rtl' className='actions-container'>
                        <div className='action'>
                            {actions && actions.map((action) => {
                                return(
                                    <div>{action}</div>
                                )
                            })}
                        </div>
                        <div className='mb-2 mx-2'>
                            <hr className='mb-0'/>
                            <AllPagesBtns/>
                        </div>
                    </div>
                </div>
            </div>}
            {windoWidth < 900 && 
            <div className="fixed-div">
                <div className="action-btns-container">
                    <div className={open ? "open-action-btn animation" : "open-action-btn"} onClick={() => setOpen(!open)}><BsPlusLg/></div>
                    {open && 
                        <div className='action-btns'>
                            {/* <h3 className='panel-title mt-3'>{panelTitle}</h3> */}
                            <div dir='rtl' className='actions-container'>
                                <div className='action-btn'>
                                    {actions && actions.map((action) => {
                                        return(
                                            <div className='action-bg'>{action}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {open && 
                <div className="fixed-btns">
                    <div className='general-btns-container'>
                        <hr className='mb-0'/>
                        <AllPagesBtns className={"ms-3 me-0"}/>
                    </div>
                </div>
                }
            </div>
            }
        </div >
        </>
    )
}

export default GeneralBody