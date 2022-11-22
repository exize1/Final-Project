import React from 'react'
import AnimalCard from '../AnimalCard/AnimalCard'
import './animalCards.css'
import { useSelector } from 'react-redux'
import { selectReport } from '../../Redux/slicer/ReportsSlice'


export default function AnimalCards({ filterKey }) {
    const allReports = useSelector(selectReport)

    const filtered = (filterKey) => {
        return(
            allReports.filter((val) => {
                if(filterKey === ""){
                    return val;
                }else if(val.location.neighborhood.includes(filterKey)){
                    return val;
                }else return null
             })
            )
        }

    return (
        <div className='cards-container'>
            {filtered(filterKey).map((report) => {
                return (
                    <AnimalCard report={report}></AnimalCard>
                )
            })}
        </div>
    )
}
