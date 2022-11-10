import "./navbar.css";
import logo from "./logo1.png"
import { Link } from 'react-router-dom';


function MainNavbar( {setDonation} ) {

    const navLinks = [
      ["volunteering", "התנדבות"], 
      ["adoption", "אימוץ כלב"], 
      ["", "חדשות"],
      ["", "צרו קשר"],
      ["donation", "תרומה"]]

    return (
      <nav className="navbar bg-light main-nav ">
        <div className=" nav-items">
          <div className="right-side-container">
              <Link to={"/"} className="navbar-brand">
                <img className='logoimg' src={logo} alt="logo"/> 
              </Link>
            <h1 className='nav-phone-number'>*4955</h1>
          </div>
          <div className= 'nav-buttons'>
          {navLinks.map((link) => {
            return(
              link[0] === "donation" ?
              <Link to={`/${link[0]}`}>
                <button className={`nav-btn`} onClick={() => setDonation(true)}>{link[1]}</button> 
              </Link>
              :<Link to={`/${link[0]}`}>
                <button className={`nav-btn`}  onClick={() => setDonation(false)}>{link[1]}</button> 
              </Link>
            )
          })
          }
          </div>
        </div>
      </nav>
    );
  }
  
  export default MainNavbar




