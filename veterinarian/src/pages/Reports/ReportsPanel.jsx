import GeneralBody from '../../Components/generalBody/GeneralBody'
import AreaDropDown from '../../Components/AreaDropdown/AreaDropDown'
import AnimalCards from '../../Components/AnimalCards/AnimalCards'
import './reportsPanel.css'
import { useState } from 'react'

const ReportsPannel = () => {

    const [filterKey, setFilterKey] = useState("")
    return (
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל דיווחים"} addOverFlow={true}>
                <div className='area-dropdown '>
                    <AreaDropDown className='area-dropdown' filterKey={filterKey} setFilterKey={setFilterKey}/>
                </div>

                <AnimalCards filterKey={filterKey}/>
            </GeneralBody>
        </div>
    )
}

export default ReportsPannel