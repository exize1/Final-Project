import { useState } from 'react';

import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import NewNavbar from './Components/navbar/Navbar';
import AdoptionPanel from './pages/adoption/AdoptionPanel';
import AppointmentsPanel from './pages/appointments/AppointmentsPanel';
import CaringPanel from './pages/caring/CaringPanel';
import RegisterInspector from './pages/register/RegisterInspector';
import Calender from './pages/calender/Calender';
import DogPage from './pages/DogPage/DogPage';
import { Route, Routes } from 'react-router-dom';

function App() {

  const [pannel, setPannel] = useState("")

  return (
    <div className="App">
      <NewNavbar setPannel={setPannel}/>
      <Routes>
            <Route path="/dogpage" element={<DogPage/>}/>
      </Routes>
      <div className='pt-4'>
        {pannel === "adoption" && <AdoptionPanel/>}
        {pannel === "appointments" && <AppointmentsPanel/>}
        {pannel === "caring" && <CaringPanel/>}
        <RegisterInspector/>
        <Calender/>
      </div>
    </div>
  );
}

export default App;
