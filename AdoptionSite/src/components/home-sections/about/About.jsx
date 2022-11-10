import heart from './heartlogo.png'
import dog from './doglogo.png'
import hand from './handlogo.png'

import './about.css'
const About = () => {
    return(
        <div className="about-container">
          <h1 className='about-title'>רקע על היוזמה</h1>
          <img className='heart-icon' src={heart}  alt="icon"/> 
          <p className='about-text'>  היוזמה ״פותחים את הלב לכלבי דימונה״ היא יוזמה שנוצרה כאשר עיירית דימונה 
              החליטה לפתור את מצוקת אימוץ הכלבים הקיימת בעיר , הבעיה העיקרית הייתה עומס ותפוסה גדולה במכלאות הכלבים 
              לאימוץ שבעיר אבל תושבי העיר אשר מעוניינים לאמץ כלב לא מודעים בכלל למכלאות העירונית שמהם ניתן לאמץ כלבים 
              מדהימים ,להציל אותם ולהרויח חבר לכל החיים קחו חלק בפרויקט ואמצו כלב לביתכם עוד היום 
              </p> 
              <img className='hand-icon' src={hand}  alt="icon"/> <p className='about-text'>
              בעלי חיים הם חלק בלתי נפרד מחיינו ולכן מחובתנו למנוע מהם חיי סבל ואלימות ולאפשר להם איכות חיים ויחס הוגן כלפיהם.אנו מאמינים שחינוך לחמלה כלפי בעלי חיים, פיתוח רגישות ומחויבות אליהם מובילים לנשיאה באחריות לגורלם וגורמים לנו להיות בני אדם טובים ורגישים יותר לזולת ולסביבה.
          </p> 
          
          <img className='dog-icon' src={dog} alt="icon"/> <p className='about-text'>
            לא סתם אומרים שהכלב הוא חברו הטוב ביותר של האדם ישנם המון אנשים 
              ,עמותות , וארגונים שלקחו חלק בהקמת המיזם ותרמו להצלחתו בעיר דימונה ומוצגים פה
          </p>
          <div className="animation">
            <div className="running-line">
              <div className="one">
                <span>
                  <img src={require("./animal.png")} alt="icon" className="imges" />
                  <img src={require("./lovepet.png")} alt="icon" className="imges" />
                  <img src={require("./baaluhaim.png")} alt="icon" className="imges" />
                  <img src={require("./dimona.png")} alt="icon" className="imges" />
                  <img src={require("./logomishmar.png")} alt="icon" className="imges" />
                  <img src={require("./animals.png")} alt="icon" className="imges" />
                </span>
              </div>
              <div className="one two">
                <span>
                <img src={require("./animal.png")} alt="" className="imges" />
                  <img src={require("./lovepet.png")} alt="" className="imges" />
                  <img src={require("./baaluhaim.png")} alt="" className="imges" />
                  <img src={require("./dimona.png")} alt="" className="imges" />
                  <img src={require("./logomishmar.png")} alt="" className="imges" />
                  <img src={require("./animals.png")} alt="" className="imges" />
                </span>
              </div>
            </div>
          </div>
        </div>
    )
}

export default About




