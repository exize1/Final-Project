import { useEffect, useState } from 'react'
import GeneralBody from '../../Components/generalBody/GeneralBody'
import './adoptionPanel.css'
import axios from 'axios'
import DogCard from '../../Components/DogCard/DogCard'
import { Link } from "react-router-dom";
import ScrollSpy from '../../Components/scrollSpy/ScrolSpy'
import { CgDisplayGrid, CgList } from "react-icons/cg"
const AdoptionPanel = () => {
    const {REACT_APP_SERVER_URL} = process.env;
    const [dogs, setDogs] = useState([])
    const [display, setDisplay] = useState(true)
    useEffect(()=>{
        const getDogs = () => {
            axios.get(`${REACT_APP_SERVER_URL}/api/dogs`)
                .then((res) => {
                    res.data && setDogs(res.data)
                })
                .catch((err) => console.log(err));
        }
        getDogs()
    },[REACT_APP_SERVER_URL])
    
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
                        {dogs.map(dog => {
                        return(
                            <Link to="dogpage">
                                <DogCard dog={dog}/>
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