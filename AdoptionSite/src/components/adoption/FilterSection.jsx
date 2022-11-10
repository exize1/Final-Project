import './filtersection.css'


const FilterSection = ({setSearchGender, searchGender, setSearchAge, searchAge, setSearchSize, searchSize}) => {
    return(
        <div className='filter-section-container container'>
            <div className="row">
                <div className="col">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle filter-btn"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {searchGender ? searchGender : "מין"}
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={() => {setSearchGender("זכר")}}><button className="dropdown-item" href="#">זכר</button></li>
                        <li onClick={() => {setSearchGender("נקבה")}}><button className="dropdown-item" href="#">נקבה</button></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li onClick={() => {setSearchGender("")}}><button className="dropdown-item" href="#">הכל</button></li>
                    </ul>
                </div>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle filter-btn"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {searchAge ? searchAge : "גיל"} 
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={() => {setSearchAge("עד שנה")}}><button className="dropdown-item" href="#">עד שנה</button></li>
                            <li onClick={() => {setSearchAge("מעל שנה")}}><button className="dropdown-item" href="#">מעל שנה</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li onClick={() => {setSearchAge("")}}><button className="dropdown-item" href="#">הכל</button></li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle filter-btn"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {searchSize ? searchSize : "גודל"}
                        </button>
                        <ul className="dropdown-menu">
                            <li onClick={() => {setSearchSize("גדול/ה")}}><button className="dropdown-item" href="#">גדול/ה</button></li>
                            <li onClick={() => {setSearchSize("בינוני/ת")}}><button className="dropdown-item" href="#">בינוני/ת</button></li>
                            <li onClick={() => {setSearchSize("קטן/ה")}}><button className="dropdown-item" href="#">קטן/ה</button></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li onClick={() => {setSearchSize("")}}><button className="dropdown-item" href="#">הכל</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSection