import About from "../../components/home-sections/about/About"
import Hero from "../../components/home-sections/hero/Hero"
import SignUp from "../Register/signup"


const Home = () => {
    return(
        <div className="home-container">
            <Hero/>
            <About/>
        </div>
    )
}

export default Home