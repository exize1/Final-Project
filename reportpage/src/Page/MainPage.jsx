import React from 'react'
import { useState } from 'react'
import LostForm from '../Forms/LostForm'
import PetForm from '../Forms/AbandonedForm'
import ReportNavbar from '../reportNavbar/ReportNavbar'
import './mainPage.css'

export default function MainPage() {
    const [petForm, setPetForm] = useState(false)

    return (

        <div className="mainpage" >
            <div className='nvabar'>
                <ReportNavbar />
                <h4>דיוווחי תושבים על חיות אבודות/משוטטות עיריית דימונה</h4><br />

            </div>
            <div className='report-container'>
                <div className='mainpage-title'>
                    <h1>
                        אזור דיווחי חיות עיריית דימונה
                    </h1>
                </div>
                <div className='buttons-container'>

                    <button type="button" className={petForm ? "btn btn-success" : "btn btn-outline- success"} onClick={() => setPetForm(true)} >טופס דיווח חיה משוטטת</button>
                    <button type="button" className={petForm ? "btn btn-outline-success" : "btn btn-success"} onClick={() => setPetForm(false)} >טופס דיווח חיית מחמד אבודה</button>
                </div>
            </div>
            <div className='form-container'>
                {petForm ? <LostForm /> : <PetForm />}
            </div>
        </div>
    )
}