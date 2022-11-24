import { useState } from 'react'
import GeneralBody from '../../Components/generalBody/GeneralBody'
import './adoptionPanel.css'
import DogCard from '../../Components/DogCard/DogCard'
import { Link } from "react-router-dom";
import ScrollSpy from '../../Components/scrollSpy/dogs/ScrolSpy'
import { CgDisplayGrid, CgList } from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux';
import { selectDog } from '../../Redux/slicer/DogSlice';
import { updateOldReqDog } from '../../utils/apiCalls';

const AdoptionPanel = () => {
    const [display, setDisplay] = useState(true)
    const dispatch = useDispatch()
    const dogs = useSelector(selectDog)
    return(
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל אימוץ"} addOverFlow={display}>
                <div className='displays-container mb-3'>
                    <div className='buttons-container mt-4'>
                        <button className='btn btn-secondary py-1 px-1' onClick={() => setDisplay(false)}><CgList className='list-emoji add-size'/></button>
                        <button className='btn btn-secondary py-1 px-1' onClick={() => setDisplay(true)}><CgDisplayGrid className='cards-emoji add-size'/></button>
                    </div>
                </div>
                {display ? 
                <div className='cards-container'>
                        {dogs.map((dog, index) => {
                            if (dog.display) return(
                                <Link to={dog._id} onClick={() => updateOldReqDog(dispatch, dog)}> 
                                    <DogCard key={index} dog={dog}/>
                                </Link>
                        )
                        return console.log();
                    })}
                </div>
                :
                <div>
                    <ScrollSpy addOverflow={true}/>
                </div>
                }
            </GeneralBody>
        </div>
    )
}

export default AdoptionPanel