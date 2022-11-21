import { useSelector } from 'react-redux'
import { selectAdoption } from '../../Redux/slicer/DogReqSlice'
import './dogcard.css'

const DogCard = ({ dog }) => {

    const dogRequests = useSelector(selectAdoption)

    const filteredReq = (filterKey) => {
        console.log(dogRequests);
        return(
            dogRequests.filter((val) => {
                if(val.dogId){
                     if(val.dogId.includes(filterKey)){
                        return val;
                    }else return null
                }else return null
            }).filter((val) => {
                if(val.newReq){
                    return val;
                }else return null
            })
        )
    }

    return(
        <div className="dog-card-container">
            <div className="card text-bg-dark dog-card">
                {filteredReq(dog._id).length > 0 && <span className="my-dog-badge">בקשת אימוץ חדשה</span>}
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