import './generalBody.css'

const GeneralBody = ({panelTitle, addOverFlow, children}) => {
    return(
        <div className='general-body'>
            <h1>{panelTitle}</h1>
            <div className={addOverFlow ? 'add-overflow children-container' : 'children-container'}>
                {children}
            </div>
        </div>
    )
}

export default GeneralBody