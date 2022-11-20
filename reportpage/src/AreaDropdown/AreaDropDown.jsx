import { useState } from 'react'
import './areaDropdown.css'
import neighborhoods from './Area.js';
function AreaDropdown() {
  const [area, setArea] = useState("")
  const [filteredList, setFilteredList] = useState(neighborhoods);

  const filterBySearch = (e) => {
    const query = e.target.value;
    let updatedList = [...neighborhoods];
    updatedList = updatedList.filter((item) =>
      item.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1)
    setFilteredList(updatedList)
  }
  return (
    <div className="dropdown">
      <div className="input-group mb-3">
        <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{area ? area : "בחירת שכונה"}</button>
        <ul className="dropdown-menu scrollable-menu">
          <li><a class="dropdown-item" dir='rtl' >בחר/י שכונה...</a></li>
          <li><hr class="dropdown-divider" /></li>
          {filteredList.map((t, index) =>
            <li key={index}><a className="dropdown-item" dir='rtl' onClick={() => setArea(t)}>{t}</a></li>
          )}
        </ul>
        {/* <input type="text" className="s" aria-label="Text input with dropdown button" onChange={filterBySearch} /> */}
      </div>
    </div>
  );
}

export default AreaDropdown;