import GeneralBody from '../../Components/generalBody/GeneralBody'
import './reportsPanel.css'

const AppointmentsPanel = () => {
    return(
        <div className='general-body-container'>
            <GeneralBody panelTitle={"פאנל דיווחים"}>
            <div class='card' style={{width: "18rem"}}>
                <img src="..." class="card-img-top" alt="..."/>

                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>

                <div class="card" aria-hidden="true" style={{width: "18rem"}}>
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                    </p>
                    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                </div>
                </div>
            </GeneralBody>
        </div>
    )
}

export default AppointmentsPanel