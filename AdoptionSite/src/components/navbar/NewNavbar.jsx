import "./newNavbar.css"
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo1.png"


const NewNavbar = ({setDonation}) =>{
    // const navigate = useNavigate();
    let windoWidth = window.innerWidth;

    const [open, setOpen] = useState(false)

    const navLinks = [
        ["volunteering", "התנדבות"], 
        ["adoption", "אימוץ כלב"], 
        ["", "חדשות"],
        ["", "צרו קשר"],
        ["donation", "תרומה"]]
  
    return(
        <>
        <nav className="navbar bg-light navbar-contianer">
            <div className="navabr-fluid">
                <div className={windoWidth < 992 ? "title-button" : "title-links-search"}>
                    {windoWidth > 992 && 
                    <div className="link-and-search-container">
                        <ul className="navbar-nav navbar-nav-close">
                            {navLinks.map((link) => {
                                return(
                                link[0] === "donation" ?
                                <li className="nav-item ">
                                    <Link to={`/${link[0]}`}>
                                        <button className={`nav-btn`} onClick={() => setDonation(true)}>{link[1]}</button> 
                                    </Link>
                                </li>
                                :<li className="nav-item ">
                                    <Link to={`/${link[0]}`}>
                                        <button className={`nav-btn`}  onClick={() => setDonation(false)}>{link[1]}</button> 
                                    </Link>
                                </li>
                                )}
                                )
                            }
                        </ul>
                    </div>}
                    {windoWidth < 992 && 
                    <>
                        <Link to={"/"} className="navbar-brand">
                            <img className='logoimg' src={logo} alt="logo"/> 
                        </Link>
                        <button  className="navbar-button" type="button" onClick={() => setOpen(!open)}><span class="navbar-toggler-icon"></span></button>
                    </>
                    }
                </div>
                {windoWidth > 992 && 
                <>
                <div className="right-side">
                    {/* <button className="btn btn-danger me-3">התנתק</button> */}
                    <Link to={"/"} className="navbar-brand">
                        <img className='logoimg' src={logo} alt="logo"/> 
                    </Link>
                </div>
                </>
                }
            </div>
            {open && 
                <ul className="navbar-nav navbar-nav-open">
                    {navLinks.map((link) => {
                        return(
                        link[0] === "donation" ?
                        <li className="nav-item">
                            <Link to={`/${link[0]}`}>
                                <button className={`nav-btn`} onClick={() => setDonation(true)}>{link[1]}</button> 
                            </Link>
                        </li>

                        :<li className="nav-item ">
                            <Link to={`/${link[0]}`}>
                                <button className={`nav-btn`}  onClick={() => setDonation(false)}>{link[1]}</button> 
                            </Link>
                        </li>
                        )}
                        )
                    }
                </ul>
            }
        </nav>
        </>
    )
}

export default NewNavbar