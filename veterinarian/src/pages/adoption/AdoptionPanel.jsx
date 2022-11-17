import { useState } from 'react'
import GeneralBody from '../../Components/generalBody/GeneralBody'
import './adoptionPanel.css'
import DogCard from '../../Components/DogCard/DogCard'
import { Link } from "react-router-dom";
import ScrollSpy from '../../Components/scrollSpy/ScrolSpy'
import { CgDisplayGrid, CgList } from "react-icons/cg"
import {  useSelector } from 'react-redux';
import { selectDog } from '../../Redux/slicer/DogSlice';

const AdoptionPanel = () => {
    const [display, setDisplay] = useState(true)

    const dogs = useSelector(selectDog)
    return(
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל אימוץ"} addOverFlow={true}>
                <div className='displays-container'>
                    <div className='buttons-container'>
                        <button className='btn btn-secondary py-1 px-1' onClick={() => setDisplay(false)}><CgList className='list-emoji add-size'/></button>
                        <button className='btn btn-secondary py-1 px-1' onClick={() => setDisplay(true)}><CgDisplayGrid className='cards-emoji add-size'/></button>
                    </div>
                </div>
                {display ? 
                <div className='cards-container'>
                        {dogs.map((dog, index) => {
                            return(
                                // <Link to={`dogpage`}>
                                <Link to={dog._id}> 
                                    <DogCard key={index} dog={dog}/>
                                </Link>
                        )
                    })}
                </div>
                :
                <div>
                    <ScrollSpy/>
                </div>
                }
            </GeneralBody>
        </div>
    )
}

export default AdoptionPanel