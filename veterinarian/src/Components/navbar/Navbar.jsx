import "./navbar.css"
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import { useState } from "react";
import Offcanvas from "../offcanvas/Offcanvas";
import { Link } from "react-router-dom";


const NewNavbar = ({ setPannel }) =>{
    // const navigate = useNavigate();
    let windoWidth = window.innerWidth;

    const [open, setOpen] = useState(false) 
    const [searchTerm, setSearchTerm] = useState("");

      
      const filterSearchProducts = (filterKey) => {
        // return(
        //   products.filter((val) => {
        //         if(filterKey === ""){
        //           return val;
        //         }else if(val.productName.toLowerCase().includes(filterKey.toLowerCase())){
        //             return val;
        //         }else return null
        //     })
        //     )
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
                            <li className="nav-item ">
                                <Link className="remove-underline" to="/">
                                    <span className="nav-link add-width" onClick={() => setOpen(false)}>בית</span>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="remove-underline" to="/adoption">
                                    <span className="nav-link add-width" onClick={() => setOpen(false)}>כלבים</span>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="remove-underline" to="/">
                                    <span className="nav-link add-width" onClick={() => setOpen(false)}>טיפולים</span>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="remove-underline" to="/">
                                    <span className="nav-link add-width" onClick={() => setOpen(false)}>משימות</span>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="remove-underline" to="/reports">
                                    <span className="nav-link add-width" onClick={() => setOpen(false)}>דיווחים</span>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="remove-underline" to="/calendar">
                                    <span className="nav-link add-width" onClick={() => setOpen(false)}>יומן</span>
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex dropdown search-input-container" role="search">
                            <input className="form-control me-2 search-input" data-bs-toggle="dropdown"  onChange={(e) => {setSearchTerm(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
                            <ul className="dropdown-menu search-dropdown-list">
                                {/* {filterSearchProducts(searchTerm).length === 0 ? 
                                // <li key="unfoundProducts"><p className="unfound-dropdown-item">Can't found a result</p></li>
                                :filterSearchProducts(searchTerm).map((productOption, index) => {
                                return(
                                    index < 3 &&
                                    <Link className="remove-underline" to={`/auction/${productOption._id}`}>
                                        <li key={index}><a className="dropdown-item" href="#search">{productOption.productName}</a></li>
                                    </Link>
                                )
                                })} */}
                            </ul>
                        </form>
                    </div>}
                    {windoWidth < 992 && 
                    <>
                        <form className="d-flex dropdown search-input-container" role="search">
                            <input className="form-control me-2 search-input" data-bs-toggle="dropdown"  onChange={(e) => {setSearchTerm(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
                            <ul className="dropdown-menu search-dropdown-list">
                                {/* {filterSearchProducts(searchTerm).length === 0 ? 
                                <li key="unfoundProducts"><p className="unfound-dropdown-item">Can't found a result</p></li>
                                :filterSearchProducts(searchTerm).map((productOption, index) => {
                                return(
                                    index < 3 &&
                                    // <Link className="remove-underline" to={`/auction/${productOption._id}`}>
                                        <li key={index}><a className="dropdown-item" href="#search">{productOption.productName}</a></li>
                                    // </Link>
                                    )
                                })} */}
                            </ul>
                        </form>
                        <button  className="navbar-button" type="button" onClick={() => setOpen(!open)}><span class="navbar-toggler-icon"></span></button>
                    </>}
                </div>
                {windoWidth > 992 && 
                <>
                <div className="right-side">
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
                <li className="nav-item ">
                    <Link className="remove-underline" to="/">
                        <span className="nav-link" onClick={() => setOpen(false)}>בית</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="remove-underline" to="/adoption">
                        <span className="nav-link" onClick={() => setOpen(false)}>כלבים</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="remove-underline" to="/">
                        <span className="nav-link" onClick={() => setOpen(false)}>טיפולים</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="remove-underline" to="/">
                        <span className="nav-link" onClick={() => setOpen(false)}>משימות</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="remove-underline" to="/reports">
                        <span className="nav-link" onClick={() => setOpen(false)}>דיווחים</span>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link className="remove-underline" to="/calendar">
                        <span className="nav-link add-width" onClick={() => setOpen(false)}>יומן</span>
                    </Link>
                </li>
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