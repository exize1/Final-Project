import './App.css';
import { Route, Routes } from 'react-router-dom';
import Adoption from './pages/Adoption/Adoption';
import Home from './pages/Home/Home';
import Volunteering from './pages/volunteering/Volunteering';
import Footer from './components/footer/Footer';
import { useState } from 'react';
import NewNavbar from './components/navbar/NewNavbar';

function App() {

  const [donation, setDonation] = useState(false)

  return (
    <div className="App">
      <NewNavbar setDonation={setDonation}/>
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
