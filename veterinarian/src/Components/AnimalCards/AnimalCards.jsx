import React from 'react'
import AnimalCard from '../AnimalCard/AnimalCard'
import './animalCards.css'
import { useSelector } from 'react-redux'
import { selectReport } from '../../Redux/slicer/ReportsSlice'


export default function AnimalCards() {
    const allReports = useSelector(selectReport)
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
