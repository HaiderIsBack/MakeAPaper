import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { 
  faMicrochip,
  faArrowRight,
  faUser,
  faMoneyBill1Wave
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css'
import { useContext, useEffect, Suspense } from "react";
import UserContext from "../UserContext";

import Zoop from "./Zoop";
import Transition from "./Transition";

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Pencil from "../meshes/Pencil";

import useLenis from "./useLenis"

function Hero() {
  useLenis()
  const navigate = useNavigate();

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    if(id){
      const element = document.getElementById(id)
      if(element){
        element.focus()
      }
    }
  },[])
  
  return (
    <>
      <div className="hero-container d-flex flex-column align-items-center">
        <h1 className="hero-heading"><Zoop>Let's Build a Bright Future</Zoop></h1>
        <p className="my-2 text-center">Create Test Papers with our powerful, simple <br /> and cost-effective solution</p>
        <button className='my-4 get-started' onClick={()=>navigate("/lab/tests")}>Get Started <FontAwesomeIcon icon={faArrowRight}/></button>

        <div className="row hero-cards" style={{marginTop: "100px"}}>
            <div className="col-lg-4 col-12 my-3 hero-cols">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <FontAwesomeIcon className="fa-3x" icon={faMicrochip} />
                  </div>
                  <h4 className="my-2">Blazing Fast</h4>
                  <p className="my-2 text-center">Create Papers instantly with our Test Maker Solution</p>
                  <button>Learn More <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 my-3 hero-cols">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <FontAwesomeIcon className="fa-3x" icon={faUser} />
                  </div>
                  <h4 className="my-2">User Friendly</h4>
                  <p className="my-2 text-center">Easy-to-Use with lots of features to fulfill your needs</p>
                  <button onClick={()=>navigate("/paper")}>Demo <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 my-3 hero-cols">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <FontAwesomeIcon className="fa-3x" icon={faMoneyBill1Wave} />
                  </div>
                  <h4 className="my-2">Cost-Effective</h4>
                  <p className="my-2 text-center">Start using our services with the lowest prices</p>
                  <button onClick={()=>navigate("/plans")}>See Plans <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
              </div>
            </div>
        </div>

        {/* Canvas */}
        {/* <ThreeDScene /> */}

        {/* First Banner */}
        <div className="row banner" style={{marginTop: "100px"}}>
          <div className="col-sm-6 col-12 my-3 d-flex align-items-center justify-content-center">
            <img src="/svg/undraw_1.svg" alt="undraw" className="w-50" loading="lazy" />
          </div>
          <div className="col-sm-6 col-12 my-3 align-self-center">
            <section>
              <h2 className="text-left">DASHBOARD</h2>
              <p className="text-left">Easy tracking of tests and drafts and many more options to customize your experience. Management of Account and stay up-to-date with the latest news from the admin.</p>
            </section>
          </div>
        </div>

        {/* Second Banner */}
        <div className="row banner py-5 shadow" style={{background: "var(--accent-gradient)", borderRadius: "7px"}}>
          <div className="col-sm-6 col-12 my-3 align-self-center">
            <section>
              <h2 className="text-left">CUSTOMIZATION</h2>
              <p className="text-left" style={{color: "#eee"}}>Adjust question types, difficulty levels. Add or remove questions, set time limits, and configure the layout to suit your needs, ensuring a unique and effective testing experience.</p>
            </section>
          </div>
          <div className="col-sm-6 col-12 my-3 d-flex align-items-center justify-content-center">
            <img src="/svg/undraw_2.svg" alt="undraw" className="w-50" loading="lazy" />
          </div>
        </div>

        {/* Third Banner */}
        <div className="row banner">
          <div className="col-sm-6 col-12 my-3 d-flex align-items-center justify-content-center">
            <img src="/svg/undraw_3.svg" alt="undraw" className="w-50" loading="lazy" />
          </div>
          <div className="col-sm-6 col-12 my-3 align-self-center">
            <section>
              <h2 className="text-left" style={{fontWeight: "700"}}>INTERNATIONAL PRODUCT</h2>
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
      <div className="canvas-wrapper">
        <SuggestBook />
      </div>
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
    <div className="suggest-book-section" id="suggest-book" tabIndex={-1}>
      <h1 className="hero-heading"><Zoop>Suggest us a Book</Zoop></h1>
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

const ThreeDScene = () => {
  
  return (
  <Canvas className="main-canvas">
    <Suspense fallback={null}>
      <Environment files={"/buikslotermeerplein_2k.hdr"} />
      <Pencil position={[0,-6,5]} />
    </Suspense>
  </Canvas>)
}

export default Transition(Hero)
