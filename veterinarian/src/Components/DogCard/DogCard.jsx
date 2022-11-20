import './dogcard.css'

const DogCard = ({ dog }) => {


    return(
        <div className="dog-card-container">
            <div className="card text-bg-dark dog-card">
                <img src={dog.details.src} className="dog-card-image" alt="..."/>
                <div className="card-img-overlay dog-card-details-container ">
                    <div>
                        <h5 className="dog-card-title card-title">{dog.details.dogName}</h5>
                    </div>
                    <div>
                        <p className="dog-card-description limited-lines">{dog.details.description}</p>
                    </div>
                    <div className="row dog-card-details">
                        <div className="col">
                            {dog.details.gender}
                        </div>
                        <div className="col">
                            {dog.details.age}
                        </div>
                        <div className="col">
                            {dog.details.size}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DogCard