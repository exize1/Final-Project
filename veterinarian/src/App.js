import { useState } from 'react';

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import NewNavbar from './Components/navbar/Navbar';
import AdoptionPanel from './pages/adoption/AdoptionPanel';
import AppointmentsPanel from './pages/appointments/AppointmentsPanel';
import CaringPanel from './pages/caring/CaringPanel';
import RegisterInspector from './pages/register/RegisterInspector';
import { Route, Routes, Link} from "react-router-dom"
import MyCalendar from "./Components/calendar/Calendar";
import "./Components/calendar//style/global.scss"
import AddEvents from "./Components/calendar/AddEvents";
import UpdateEvent from "./Components/calendar/UpdateEvent";import DogPage from './pages/DogPage/DogPage';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [pannel, setPannel] = useState("")

  return (
    <div className="App">
    <NewNavbar setPannel={setPannel}/>
      <Dashboard/>
      <Routes>
            {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
            <Route path="/dogpage" element={<DogPage/>}/>
            <Route path="/adoption" element={<AdoptionPanel/>}/>
            <Route path="/appointments" element={<AppointmentsPanel/>}/>
            <Route  path="/" exact element={<MyCalendar/>} />
            <Route path="/events/add" element={<AddEvents/>}/>
            <Route path="/event/:id/update" element={<UpdateEvent/>}/>
      </Routes>
      <div className='pt-4'>
        {pannel === "adoption" && <AdoptionPanel/>}
        {pannel === "appointments" && <AppointmentsPanel/>}
        {pannel === "caring" && <CaringPanel/>}
        <RegisterInspector/>
      </div> 

                        {/* <nav className="navbar navbar-light bg-light"> */}
     
      <DogPage/>
                        {/* <div className="container-fluid align-items-center">
                          <Link className="navbar-brand ms-2" to="/">
                            <h3>Agenda</h3>
                          </Link>
                          <span className="navbar-brand mb-0 h2 "><Link className="nav-link pe-0 " to={"/events/add"}>Add Event</Link></span> 
                        </div>*/}

                  {/* </nav> */}
    </div>
  );
}

export default App;
