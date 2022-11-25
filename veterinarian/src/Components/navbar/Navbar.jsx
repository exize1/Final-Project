import "./navbar.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiBellAlert, HiOutlineBell, HiOutlineHome } from 'react-icons/hi2'
import { BiLogOut } from 'react-icons/bi'
import { MdOutlineVolunteerActivism } from 'react-icons/md'
import { GrTask } from 'react-icons/gr'
import { SiWolframlanguage } from 'react-icons/si'
import { TbReportMedical } from 'react-icons/tb'
import { BsCalendarEvent } from 'react-icons/bs'
import { selectUser, updateUserData } from "../../Redux/slicer/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import { selectDog } from "../../Redux/slicer/DogSlice";

const NewNavbar = () =>{


    const dogs = useSelector(selectDog)
    const user = useSelector(selectUser)

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
        if (dogs) return(
            dogs.filter((val) => {
                if(val.display){
                    if(filterKey === ""){
                    return val;
                    }else if(val.details.dogName.toLowerCase().includes(filterKey.toLowerCase())){
                        return val;
                    }else return null
                } else return null
                })
                )
        }
        const dispatch = useDispatch();

    return(
        <>
        <nav className="navbar navbar-contianer">
            <div className="navabr-fluid">
                <div className={windoWidth < 992 ? "title-button" : "title-links-search"}>
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
                            <input className="form-control me-2 search-input" data-bs-toggle="dropdown"  onChange={(e) => {setSearchTerm(e.target.value)}} type="search" placeholder="חיפוש כלבים..." aria-label="Search"/>
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
                        <div className="nav-btn-container">
                            <button  className="navbar-button decreas-size" type="button" onClick={() => setOpen(!open)}><span class="navbar-toggler-icon"></span></button>
                        </div>
                    </>}
                </div>
                {windoWidth > 992 && 
                <>                        
                <div dir="rtl" className="right-side">
                    {user.role === "admin" && 
                    <ul className="navbar-nav navbar-nav-close">
                        <li className="nav-item ">
                            <Link className="remove-underline" to={`/register`}>
                                <span className="nav-link add-width-register" onClick={() => setOpen(false)}>הרשמת משתמשים</span>
                            </Link>
                        </li>
                    </ul>}
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
            <div dir="rtl" className="emojy-btns-nav-links-container">
                <ul className="navbar-nav navbar-nav-open">
                    <div>
                    {routes.map((route, index) => {
                                    return(
                                    <li key={index} className="nav-item ">
                                        <div className="emoji-container">
                                            <Link className="remove-underline" to={`/${route[1]}`}>
                                                <div className="rounded">
                                                    {index === 0 && <HiOutlineHome className="emoji" onClick={() => setOpen(false)}/>}
                                                    {index === 1 && <SiWolframlanguage className="emoji" onClick={() => setOpen(false)}/>}
                                                    {index === 2 && <GrTask className="emoji" onClick={() => setOpen(false)}/>}
                                                    {index === 3 && <TbReportMedical className="emoji" onClick={() => setOpen(false)}/>}
                                                    {index === 4 && <MdOutlineVolunteerActivism className="emoji" onClick={() => setOpen(false)}/>}
                                                    {index === 5 && <BsCalendarEvent className="emoji" onClick={() => setOpen(false)}/>}
                                                </div>
                                            </Link>
                                            {index === 0 && <span className="explain">{route[0]}</span>}
                                            {index === 1 && <span className="explain">{route[0]}</span>}
                                            {index === 2 && <span className="explain">{route[0]}</span>}
                                            {index === 3 && <span className="explain">{route[0]}</span>}
                                            {index === 4 && <span className="explain">{route[0]}</span>}
                                            {index === 5 && <span className="explain">{route[0]}</span>}
                                        </div>
                                    </li>
                                    )
                                })}
                    </div>
                    <button className=" me-3 remove-borders logout-btn-open" 
                        onClick={() => {
                                navigate("/login")
                                dispatch(updateUserData({}))}
                            }
                            >
                            <div className='logout-icon-container'>
                                <BiLogOut className="logout-rounded"/>
                            </div>
                            <div className='popper mt-1'>
                                <p>התנתקות</p>
                            </div>
                    </button>
                </ul>
            </div>
            }
        </nav>
        </>
    )
}

export default NewNavbar