import './generalBody.css'
import AllPagesBtns from '../allPagesBtns/allPagesBtns';

const GeneralBody = ({panelTitle, addOverFlow, removeUpperBg, children, actions}) => {

    return(
        <>
        <div className={!removeUpperBg && 'general-body'}>

            <div className={'children-container'}>
                <div className={addOverFlow ? "add-overflow  children" : 'children'}>
                    {children}
                </div>
            </div>
            <div className='movebar-container'>
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
            </div>
        </div >
        </>
    )
}

export default GeneralBody