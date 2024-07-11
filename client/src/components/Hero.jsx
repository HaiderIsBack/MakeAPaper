import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { 
  faMicrochip,
  faArrowRight,
  faUser,
  faMoneyBill1Wave
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css'
import { useContext } from "react";
import UserContext from "../UserContext"

function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-container d-flex flex-column align-items-center">
        <div className="boxes">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
        <h1 style={{marginTop: "100px"}}>Let's Build a Bright Future</h1>
        <p className="my-2">Create Test Papers with our powerful, simple <br /> and cost-effective solution</p>
        <button className='my-4 get-started'>Get Started <FontAwesomeIcon icon={faArrowRight}/></button>

        <div className="row w-100" style={{marginTop: "100px"}}>
            <div className="col-md-4 col-12">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <FontAwesomeIcon className="fa-3x" icon={faMicrochip} />
                  </div>
                  <h4 className="my-2">Blazing Fast</h4>
                  <p className="my-2">Create Papers instantly with our Test Maker Solution</p>
                  <button>Learn More <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <FontAwesomeIcon className="fa-3x" icon={faUser} />
                  </div>
                  <h4 className="my-2">User Friendly</h4>
                  <p className="my-2">Easy-to-Use with lots of features to fulfill your needs</p>
                  <button onClick={()=>navigate("/paper")}>Demo <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <FontAwesomeIcon className="fa-3x" icon={faMoneyBill1Wave} />
                  </div>
                  <h4 className="my-2">Cost-Effective</h4>
                  <p className="my-2">Start using our services with the lowest prices</p>
                  <button onClick={()=>navigate("/plans")}>See Plans <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
              </div>
            </div>
        </div>

        {/* First Banner */}
        <div className="row banner" style={{marginTop: "100px"}}>
          <div className="col-sm-6 col-12 align-self-center justify-self-center">
            <img src="/svg/undraw_1.svg" alt="undraw" className="w-50" loading="lazy" />
          </div>
          <div className="col-sm-6 col-12 align-self-center">
            <section>
              <h2 className="text-left">BEST SERVICES</h2>
              <p className="text-left">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam laborum illum tempora excepturi cumque vel accusantium. Explicabo dolor quae sunt!</p>
            </section>
          </div>
        </div>

        {/* Second Banner */}
        <div className="row banner p-2 py-5 shadow" style={{background: "var(--btn)", borderRadius: "7px"}}>
          <div className="col-sm-6 col-12 align-self-center">
            <section>
              <h2 className="text-left">BEST SERVICES</h2>
              <p className="text-left" style={{color: "#eee"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam laborum illum tempora excepturi cumque vel accusantium. Explicabo dolor quae sunt!</p>
            </section>
          </div>
          <div className="col-sm-6 col-12 align-self-center justify-self-center">
            <img src="/svg/undraw_2.svg" alt="undraw" className="w-50" loading="lazy" />
          </div>
        </div>

        {/* Third Banner */}
        <div className="row banner">
          <div className="col-sm-6 col-12 align-self-center justify-self-center">
            <img src="/svg/undraw_3.svg" alt="undraw" className="w-50" loading="lazy" />
          </div>
          <div className="col-sm-6 col-12 align-self-center">
            <section>
              <h2 className="text-left" style={{fontWeight: "700"}}>BEST SERVICES</h2>
              <p className="text-left">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam laborum illum tempora excepturi cumque vel accusantium. Explicabo dolor quae sunt!</p>
            </section>
          </div>
        </div>
      </div>

      {/* Quotes Marquee */}
      <div className="quotes-marquee">
        <div className="marquee">
          <h1>Be Creative</h1>
          <h1>Test your skills</h1>
          <h1>Be Successfull</h1>
          <h1>Be Strong</h1>
          <h1>Be Creative</h1>
          <h1>Test your skills</h1>
          <h1>Be Successfull</h1>
          <h1>Be Strong</h1>
        </div>
      </div>

      {/* Suggest a Book */}
      <SuggestBook />
    </>
  )
}

const SuggestBook = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  function sanitizeInput(input) {
    return input.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "").replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!user){
      navigate("/login");
    }else{
      const suggestForm = e.target;
      const bookName = sanitizeInput(suggestForm.bookName.value.trim())
      const message = sanitizeInput(suggestForm.msg.value.trim())
      const payload = {
        bookName,
        message
      }
      
    }
  }
  return (
    <div className="suggest-book-section">
      <h1>Suggest us a Book</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book-name" className="text-left">Book Name</label>
        <input type="text" id="book-name" name="bookName" placeholder="e.g Artificial Intelligence" />
        <label htmlFor="msg" className="text-left">Message for Admin</label>
        <textarea name="msg" id="msg" placeholder="e.g I need questions from vice versa book from this [Author]"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Hero
