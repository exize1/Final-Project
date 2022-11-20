import React from 'react'
import { useState } from 'react'
import LostForm from '../Forms/LostForm'
import PetForm from '../Forms/PetForm'
import ReportNavbar from '../reportNavbar/ReportNavbar'

export default function MainPage() {
    const [petForm, setPetForm] = useState(false)

    return (
        <div>
            <div className="mainPage" >
                <ReportNavbar></ReportNavbar>
                <button type="button" className={petForm ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setPetForm(true)} >טופס דיווח חיה משוטטת</button>
                <button type="button" className={petForm ? "btn btn-outline-primary" : "btn btn-primary"} onClick={() => setPetForm(false)} >טופס דיווח חיית מחמד אבודה</button>
            </div>
            <div>
                {petForm ? <LostForm /> : <PetForm />}
            </div>
        </div>
    )
}