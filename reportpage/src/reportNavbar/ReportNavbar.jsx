import React from 'react'
import './reportNavbar.css'
import logo from '../uploads/dimonaLogo.png'


export default function ReportNavbar() {
  return (
    <div className='report-navbar'>
      <nav class="navbar bg-light">
        <div class="container-fluid report-navbar-img">
          <img src={logo} alt="Logo" width="60" className="d-inline-block align-text-top container-fluid-img" />
        </div>
      </nav>
    </div>
  )
}
