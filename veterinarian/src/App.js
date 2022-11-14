import { useState } from 'react';
import './App.css';
import NewNavbar from './Components/navbar/Navbar';
import AdoptionPanel from './pages/adoption/AdoptionPanel';
import AppointmentsPanel from './pages/appointments/AppointmentsPanel';
import CaringPanel from './pages/caring/CaringPanel';
import RegisterInspector from './pages/register/RegisterInspector';
import Calender from './pages/calender/Calender';

function App() {

  const [pannel, setPannel] = useState("")

  return (
    <div className="App">
      <NewNavbar setPannel={setPannel}/>
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
