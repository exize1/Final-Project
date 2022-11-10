import './App.css';
import { Route, Routes } from 'react-router-dom';
import Adoption from './pages/Adoption/Adoption';
import MainNavbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Volunteering from './pages/volunteering/Volunteering';
import Footer from './components/footer/Footer';
import { useState } from 'react';

function App() {

  const [donation, setDonation] = useState(false)

  return (
    <div className="App">
      <MainNavbar setDonation={setDonation}/>
      <div className='move-under-nav'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/adoption" element={<Adoption/>}/>
          <Route path="/volunteering" element={<Volunteering/>}/>
        </Routes>
      </div>
      <Footer donation={donation}/>
    </div>
  );
}

export default App;
