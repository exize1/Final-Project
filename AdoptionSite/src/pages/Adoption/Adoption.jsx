import './adoption.css'
import { useEffect, useState } from "react"
import DogCard from "../../components/adoption/DogCard"
import FilterSection from "../../components/adoption/FilterSection"
import dog from '../../components/home-sections/about/doglogo.png'
import NoResoultModal from '../../components/adoption/NoResoultModal'

const Adoption = ({dogs}) => {

    const [searchGender, setSearchGender] = useState("");
    const [searchAge, setSearchAge] = useState("");
    const [searchSize, setSearchSize] = useState("");

   


    const filtered = () => {
        return(
            dogs.filter((val) => {
                if(val.forAdopting){
                    return val;
                }else return null
            }).filter((val) => {
                if(searchGender === ""){
                    return val;
                }else if(val.gender.includes(searchGender)){
                    return val;
                }else return null
            }).filter((val) => {
                if(searchAge === ""){
                    return val;
                }else if(val.age.includes(searchAge)){
                    return val;
                }else return null
            }).filter((val) => {
                if(searchSize === ""){
                    return val;
                }else if(val.size.includes(searchSize)){
                    return val;
                }else return null
            })
        )
    }
    


    return(
        <div className="adoption-container container">
            <div className='save-your-spot-btn'>
                <NoResoultModal name="מיצאו את הכלב עבורכם"/>  
            </div>
            <div className='adopted-top'> 
                <img className='dog-hand' src={dog} alt="icon"/>
                <h1 className='adoption-title'>אמצו כלב עוד היום</h1>
            </div>

            <FilterSection 
                setSearchGender={setSearchGender} 
                searchGender={searchGender}
                setSearchAge={setSearchAge}
                searchAge={searchAge}
                setSearchSize={setSearchSize}
                searchSize={searchSize}
            />
            <div className="cards-container">
                {filtered().length === 0 ? 
                    (<div>
                        <p>לא מוצא/ת את הכלב שאת/ה מחפש/ת?</p>
                        <NoResoultModal name="לחצ/י כאן" size={searchSize} age={searchAge} gender={searchGender} />
                    </div>) : filtered().map(dog => <DogCard dog={dog}/>)}
            </div>
        </div>
    )
}

export default Adoption