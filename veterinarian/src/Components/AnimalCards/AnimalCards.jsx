import React from 'react'
import { useEffect, useState } from 'react'
import AnimalCard from '../AnimalCard/AnimalCard'
import axios from 'axios'
import './animalCards.css'


export default function AnimalCards() {
    const [allReports, setAllReports] = useState([])
    const [counter, setCounter] = useState("")
    const [counterb, setCounterb] = useState(0)

    const getAnimals = () => {
        axios.get(`https://eager-petticoat-hare.cyclic.app/api/animals`)
            .then((res) => {
                res.data && setAllReports([...res.data])
                console.log(allReports);
                setCounter(allReports.length)
            })
    }
    useEffect(() => {
        // function a() {
        //     getAnimals()
        //     if (counterb < counter) {
        //         alert('התווסף דיווח חדש')
        //         setCounterb(counter)
        //     }
        // }
        // a()
        getAnimals()

    }, [])

    return (
        <div className='cards-container'>
            {allReports.map((report) => {
                return (
                    <AnimalCard report={report}></AnimalCard>
                )
            })}
        </div>
    )
}


// function Home() {
//   return (
//     <div className="home">
//       <PetCards id={id} image={images} problem={problem} type={type} name={name} phone={phone} email={email} size={size} vailent={vailent} place={place} time={time} exstraD={exstraD}></PetCards>
//       <Footer />
//     </div>
//   );
// }