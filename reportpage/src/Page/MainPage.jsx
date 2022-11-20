import React from 'react'
import { useState } from 'react'
import LostForm from '../Forms/LostForm'
import PetForm from '../Forms/PetForm'
import ReportNavbar from '../reportNavbar/ReportNavbar'
import './mainPage.css'

export default function MainPage() {
    const [petForm, setPetForm] = useState(false)

    return (
        <div>
            <div className="mainpage" >
                <ReportNavbar></ReportNavbar>
                <div className='mainpage-title'>
                    <h1>
                        טפסי דיווח על חיות
                    </h1>
                </div>
                <button type="button" className={petForm ? "btn btn-secondary" : "btn btn-outline-secondary"} onClick={() => setPetForm(true)} >טופס דיווח חיה משוטטת</button>
                <button type="button" className={petForm ? "btn btn-outline-secondary" : "btn btn-secondary"} onClick={() => setPetForm(false)} >טופס דיווח חיית מחמד אבודה</button>
            </div>
            <div>
                {petForm ? <LostForm /> : <PetForm />}
            </div>
        </div>
    )
}