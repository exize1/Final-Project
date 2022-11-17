import "./navbar.css"
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Offcanvas from "../offcanvas/Offcanvas";
import { Link } from "react-router-dom";
import { HiBellAlert, HiOutlineBell } from 'react-icons/hi2'
import { publicRequest } from "../../requestMethods";

const NewNavbar = ({ setPannel }) =>{

    const [dogs, setDogs] = useState([])
    useEffect(()=>{
        const getDogs = () => {
            publicRequest.get(`/api/dogs`)
                .then((res) => {
                    // res.data && dispatch(updateDogData(res.data))
                    res.data && setDogs(res.data)
                })
                .catch((err) => console.log(err));
        }
        getDogs()
    },[])
    // const navigate = useNavigate();
    let windoWidth = window.innerWidth;

    const AddLogoutButton = "add AddLogoutButton"
    console.log(AddLogoutButton)
    const [open, setOpen] = useState(false) 
    const [searchTerm, setSearchTerm] = useState("");
    const [haveMission, setHaveMission] = useState(false);

      const routes = [["בית", ""], ["כלבים", "adoption"], ["משימות", "assignments"], ["דיווחים", "reports"], ["יומן", "calendar"] ]
      const filterSearchProducts = (filterKey) => {
        return(
          dogs.filter((val) => {
                if(filterKey === ""){
                  return val;
                }else if(val.dogName.toLowerCase().includes(filterKey.toLowerCase())){
                    return val;
                }else return null
            })
            )
        }
        // const dispatch = useDispatch();

    return(
        <>
        <nav className="navbar bg-light navbar-contianer">
            <div className="navabr-fluid">
                <div className={windoWidth < 992 ? "title-button" : "title-links-search"}>
                {/* <Link className="remove-underline" to="/"><a className="navbar-brand navbar-title" href="#home" onClick={() => setOpen(false)}>BidMe</a></Link> */}
                    {windoWidth > 992 && 
                    <div className="link-and-search-container">
                        <ul className="navbar-nav navbar-nav-close">
                            {routes.map((route, index) => {
                                return(
                                <li key={index} className="nav-item ">
                                    <Link className="remove-underline" to={`/${route[1]}`}>
                                        <span className="nav-link add-width" onClick={() => setOpen(false)}>{route[0]}</span>
                                    </Link>
                                </li>
                                )
                            })}
                        </ul>
                        <form className="d-flex dropdown search-input-container" role="search">
                            <input className="form-control me-2 search-input" data-bs-toggle="dropdown"  onChange={(e) => {setSearchTerm(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
                            <ul className="dropdown-menu search-dropdown-list">
                                {filterSearchProducts(searchTerm).length === 0 ? 
                                <li key="unfoundProducts"><p className="unfound-dropdown-item">Can't found a result</p></li>
                                :filterSearchProducts(searchTerm).map((dog, index) => {
                                return(
                                    index < 3 &&
                                    <Link className="remove-underline" to={`/auction/${dog._id}`}>
                                        <li key={index}><a className="dropdown-item" href="#search">{dog.dogName}</a></li>
                                    </Link>
                                )
                                })}
                            </ul>
                        </form>
                    </div>}
                    {windoWidth < 992 && 
                    <>
                        <form className="d-flex dropdown search-input-container" role="search">
                            <input className="form-control me-2 search-input" data-bs-toggle="dropdown"  onChange={(e) => {setSearchTerm(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
                            <ul className="dropdown-menu search-dropdown-list">
                                {filterSearchProducts(searchTerm).length === 0 ? 
                                <li key="unfoundProducts"><p className="unfound-dropdown-item">Can't found a result</p></li>
                                :filterSearchProducts(searchTerm).map((dog, index) => {
                                return(
                                    index < 3 &&
                                    // <Link className="remove-underline" to={`/auction/${productOption._id}`}>
                                        <li key={index}><a className="dropdown-item" href="#search">{dog.dogName}</a></li>
                                    // </Link>
                                    )
                                })}
                            </ul>
                        </form>
                        <button  className="navbar-button" type="button" onClick={() => setOpen(!open)}><span class="navbar-toggler-icon"></span></button>
                    </>}
                </div>
                {windoWidth > 992 && 
                <>
                <div className="right-side">
                    {haveMission ? 
                        <div className="badge-container">
                            <span className="my-badge">1</span>
                            <HiBellAlert onClick={() => setHaveMission(false)} style={{fontSize: "1.4rem"}}/>
                        </div>
                        :
                        <div>
                            <HiOutlineBell onClick={() => setHaveMission(true)} style={{fontSize: "1.4rem"}}/>
                        </div>
                    }
                    <Offcanvas setPannel={setPannel}/>
                    {/* <button className="btn btn-danger me-3" onClick={() => {
                        navigate("/login")
                        dispatch(updateUserData({}))}
                        }>logout</button> */}
                </div>
                </>
                }
            </div>
        {open && 
            <ul className="navbar-nav navbar-nav-open">
                {routes.map((route, index) => {
                                return(
                                <li key={index} className="nav-item ">
                                    <Link className="remove-underline" to={`/${route[1]}`}>
                                        <span className="nav-link" onClick={() => setOpen(false)}>{route[0]}</span>
                                    </Link>
                                </li>
                                )
                            })}
                {/* <li className="nav-item logout-add-product-container"> */}
                    {/* <FontAwesomeIcon icon="fa-right-from-bracket" className="logout-btn" onClick={() => dispatch(updateUserData({}))}/> */}
                {/* </li> */}
            </ul>
        }
        </nav>
        </>
    )
}

export default NewNavbar