
import "./hero.css"
// import backgroundvideo from './dogvideobg2.mp4'
import { Link } from "react-router-dom"

const Hero = () => {
    return(
        <div className="hero-container">
            {/* <video autoPlay loop muted id="background-video">
                <source src={backgroundvideo}  type="video/mp4"/>
            </video> */}
            <div className="home-page-hero-container">
                <div className="home-page-hero">
                    <div className="hero-text">
                        <h2 className="hero-sub-title">עשרות כלבים מחכים לבית</h2>
                        <h1 className="hero-title">בואו לאמץ חבר/ה</h1>
                        <div className="hero-btn-container">
                            <Link to={"/adoption"}>
                                <button className="hero-btn">אמצו עכשיו</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero