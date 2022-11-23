import './App.css';
import { Route, Routes } from 'react-router-dom';
import Adoption from './pages/Adoption/Adoption';
import Home from './pages/Home/Home';
import Volunteering from './pages/volunteering/Volunteering';
import Footer from './components/footer/Footer';
import { useState } from 'react';
import axios from 'axios'
import NewNavbar from './components/navbar/NewNavbar';
import { useEffect } from 'react';


function App() {
  const {REACT_APP_SERVER_URL} = process.env;
  const [dogs, setDogs] = useState([])

  const [donation, setDonation] = useState(false)
  useEffect(()=>{
    const getDogs = () => {
        axios.get(`${REACT_APP_SERVER_URL}/api/dogs`)
            .then((res) => {
                res.data && setDogs(res.data)
            })
            .catch((err) => console.log(err));
    }
    getDogs()
},[REACT_APP_SERVER_URL])
  return (
    <div className="App">
      <NewNavbar setDonation={setDonation}/>
      <div className='move-under-nav'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/adoption" element={<Adoption dogs={dogs}/>}/>
          <Route path="/volunteering" element={<Volunteering/>}/>
          {/* <Route path="/login" element ={<Login/>}/> */}
        </Routes>
      </div>
      <Footer donation={donation}/>
    </div>
  );
}

export default App;
