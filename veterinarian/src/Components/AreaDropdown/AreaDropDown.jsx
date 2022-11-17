import { useState } from 'react'
import './areaDropdown.css'
import neighborhood from './Area.js';
function AreaDropdown() {
  const [area, setArea] = useState("")
  return (
    <div className="dropdown">
      <div className="input-group mb-3">
        <input type="text" className="s" aria-label="Text input with dropdown button" />
        <button dir='rtl' className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{area ? area : "סינון לפי שכונות"}</button>
        <ul className="dropdown-menu scrollable-menu">
          <li><a class="dropdown-item" dir='rtl' >בחר/י שכונה...</a></li>
          <li><hr class="dropdown-divider" /></li>
          {neighborhood.map(e =>
            <li><a className="dropdown-item" dir='rtl' onClick={() => setArea(e)}>{e}</a></li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AreaDropdown;