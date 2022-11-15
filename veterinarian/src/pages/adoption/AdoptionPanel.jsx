import { useEffect, useState } from 'react'
import GeneralBody from '../../Components/generalBody/GeneralBody'
import './adoptionPanel.css'
import axios from 'axios'
import DogCard from '../../Components/DogCard/DogCard'
import { Link } from "react-router-dom";

const AdoptionPanel = () => {
    const {REACT_APP_SERVER_URL} = process.env;
    const [dogs, setDogs] = useState([])

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
                <div className='cards-container'>
                        {dogs.map(dog => {
                        return(
                            <Link to="dogpage">
                                <DogCard dog={dog}/>
                            </Link>
                        )
                    })}
                </div>
            </GeneralBody>
        </div>
    )
}

export default AdoptionPanel