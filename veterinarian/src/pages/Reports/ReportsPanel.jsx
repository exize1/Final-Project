import GeneralBody from '../../Components/generalBody/GeneralBody'
import AreaDropDown from '../../Components/AreaDropdown/AreaDropDown'
import AnimalCards from '../../Components/AnimalCards/AnimalCards'
import './reportsPanel.css'
import { useState } from 'react'
import { CgDisplayGrid, CgList } from "react-icons/cg"
import ScrollSpyReports from '../../Components/scrollSpy/ScrollSpyReports/ScrollspyReports'

const ReportsPannel = () => {

    const [filterKey, setFilterKey] = useState("")
    const [display, setDisplay] = useState(true)

    return (
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל דיווחים"} addOverFlow={true}>
                
                
                <div className='displays-container mb-3'>
                    <div className='buttons-container mt-4'>
                        <button className='btn btn-secondary py-1 px-1' onClick={() => setDisplay(false)}><CgList className='list-emoji add-size'/></button>
                        <button className='btn btn-secondary py-1 px-1' onClick={() => setDisplay(true)}><CgDisplayGrid className='cards-emoji add-size'/></button>
                    </div>
                </div>

              {
                display?
                <div>

                    <div className='area-dropdown '>
                        <AreaDropDown className='area-dropdown' filterKey={filterKey} setFilterKey={setFilterKey}/>
                    </div>
                        <AnimalCards filterKey={filterKey}/>
                </div>

                :
                <ScrollSpyReports></ScrollSpyReports>
              }

            </GeneralBody>
        </div>
    )
}

export default ReportsPannel