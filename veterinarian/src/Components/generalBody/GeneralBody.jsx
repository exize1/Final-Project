import './generalBody.css'

const GeneralBody = ({panelTitle, children}) => {
    return(
        <div className='general-body'>
            <h1>{panelTitle}</h1>
            <div className='children-container'>
                {children}
            </div>
        </div>
    )
}

export default GeneralBody