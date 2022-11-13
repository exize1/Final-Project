import { BiArrowFromRight } from 'react-icons/bi'
import "./offcanvas.css"


const Offcanvas = ({ setPannel }) => {
    return(
        <>
        <BiArrowFromRight className="offcanvas-icon" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"/>

        <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">תפריט ראשי</h5>
            </div>
            <div className="offcanvas-body">
                <p onClick={() => setPannel("adoption")}>פאנל אימוץ</p>
                <p onClick={() => setPannel("caring")}>פאנל טיפולים</p>
                <p onClick={() => setPannel("appointments")}>פאנל תורים</p>
            </div>
        </div>
        </>
    )
}

export default Offcanvas