import GeneralBody from '../../Components/generalBody/GeneralBody'
import AreaDropDown from '../../Components/AreaDropdown/AreaDropDown'
import AnimalCards from '../../Components/AnimalCards/AnimalCards'
import './reportsPanel.css'

const ReportsPannel = () => {
    return (
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל דיווחים"} addOverFlow={true}>
                <div className='area-dropdown '>
                    <AreaDropDown className='area-dropdown '/>
                </div>

                <AnimalCards/>
            </GeneralBody>
        </div>
    )
}

export default ReportsPannel