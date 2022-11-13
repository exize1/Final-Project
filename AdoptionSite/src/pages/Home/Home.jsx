// import { Route } from "react-router-dom"
import About from "../../components/home-sections/about/About"
import Hero from "../../components/home-sections/hero/Hero"
// import Login from "../Login/login"

const Home = () => {
    return(
        <div className="home-container">
            <Hero/>
            <About/>
        </div>
    )
}

export default Home
