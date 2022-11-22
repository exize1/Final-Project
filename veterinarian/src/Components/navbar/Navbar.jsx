import "./navbar.css"
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiBellAlert, HiOutlineBell } from 'react-icons/hi2'
import { BiLogOut } from 'react-icons/bi'
// import { publicRequest } from "../../requestMethods";
import { updateUserData } from "../../Redux/slicer/UserSlice";
import { useDispatch } from "react-redux";
import { socket } from "../../App";

const NewNavbar = () =>{


    const [dogs, setDogs] = useState([])
    // useEffect(()=>{
    //     // const getDogs = () => {
    //     //     publicRequest.get(`/api/dogs`)
    //     //         .then((res) => {
    //     //             // res.data && dispatch(updateDogData(res.data))
    //     //             res.data && setDogs(res.data)
    //     //         })
    //     //         .catch((err) => console.log(err));
    //     // }
    //     // getDogs()
    // },[])
    const [haveNewReport, setHaveNewReport] = useState(false);
    const [counterNotfiction, setCounterNotfiction] = useState(0);

    const clearNotfiction = () =>{
        setHaveNewReport(false)
        setCounterNotfiction(0)
    }
    useEffect(()=>{
        const newNotfiction = () =>{
            setHaveNewReport(true)
            let counter = counterNotfiction+1
            console.log(counter);
            setCounterNotfiction(counter)
        }
      socket.on("recive_msg",(data)=>{
        newNotfiction()
      })
    },[counterNotfiction])
    const navigate = useNavigate();
    let windoWidth = window.innerWidth;

    const [open, setOpen] = useState(false) 
    const [searchTerm, setSearchTerm] = useState("");
      
      const routes = [["בית", ""], ["כלבים", "adoption"], ["משימות", "assignments"], ["דיווחים", "reports"],  ["התנדבויות", "volunteering"], ["יומן", "calendar"] ]
      const filterSearchDogs = (filterKey) => {
        return(
          dogs.filter((val) => {
                if(filterKey === ""){
                  return val;
                }else if(val.details.dogName.toLowerCase().includes(filterKey.toLowerCase())){
                    return val;
                }else return null
            })
            )
        }
        const dispatch = useDispatch();

    return(
        <>
        <nav className="navbar navbar-contianer">
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
                        <form dir="rtl" className="d-flex dropdown search-input-container" role="search">
                            <input className="form-control me-2 search-input" data-bs-toggle="dropdown"  onChange={(e) => {setSearchTerm(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
                            <ul className="dropdown-menu search-dropdown-list">
                                {filterSearchDogs(searchTerm).length === 0 ? 
                                <li key="unfoundDogs"><p className="unfound-dropdown-item">לא נמצאו התאמות</p></li>
                                :filterSearchDogs(searchTerm).map((dog, index) => {
                                return(
                                    index < 3 &&
                                    <Link className="remove-underline" to={`/adoption/${dog._id}`}>
                                        <li key={index}><a className="dropdown-item" href="#search">{dog.details.dogName}</a></li>
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
                                {filterSearchDogs(searchTerm).length === 0 ? 
                                <li key="unfoundDogs"><p className="unfound-dropdown-item">לא נמצאו התאמות</p></li>
                                :filterSearchDogs(searchTerm).map((dog, index) => {
                                return(
                                    index < 3 &&
                                    <Link className="remove-underline" to={`/adoption/${dog._id}`}>
                                        <li key={index}><a className="dropdown-item" href="#search">{dog.details.dogName}</a></li>
                                    </Link>
                                    )
                                })}
                            </ul>
                        </form>
                        <button  className="navbar-button" type="button" onClick={() => setOpen(!open)}><span class="navbar-toggler-icon"></span></button>
                    </>}
                </div>
                {windoWidth > 992 && 
                <>
                <div dir="rtl" className="right-side">
                    {haveNewReport ? 
                        <div className="badge-container">
                            <span className="my-badge">{counterNotfiction}</span>
                            <HiBellAlert onClick={() => clearNotfiction()} style={{fontSize: "1.4rem"}}/>
                        </div>
                        :
                        <div>
                            <HiOutlineBell  style={{fontSize: "1.4rem"}}/>
                        </div>
                    }
                    <button className=" me-3 remove-borders" 
                    onClick={() => {
                        navigate("/login")
                        dispatch(updateUserData({}))}
                        }
                        >
                            <div className='logout-icon-container'>
                                <BiLogOut/>
                            </div>
                            <div className='popper mt-1'>
                                <p>התנתקות</p>
                            </div>
                        </button>
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