import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { 
  faMicrochip,
  faArrowRight,
  faUser,
  faMoneyBill1Wave
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css'
import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

import Zoop from "./Zoop";
import Transition from "./Transition";

import ZoomTransition from "./ZoomTransition";

function Hero() {
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
        <main>
          <div className="row">
            <div className="col-8 align-self-center">
              <h1 className="hero-heading"><Zoop>Let's Build a Bright Future</Zoop></h1>
              <p className="my-2">Create Test Papers with our powerful, simple <br /> and cost-effective solution</p>
              <button className='my-4 get-started' onClick={()=>navigate("/paper")}>Get Started <FontAwesomeIcon icon={faArrowRight}/></button>
            </div>
            <div className="col-4">
              <span hidden>
                Illustration by <a href="https://icons8.com/illustrations/author/ZQDZn9ZZj5aQ">Violetta Barsuk</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
              </span>
              <img src="/images/hero/florid-student.gif" className="animated-gif" alt="" loading="lazy" />
            </div>
          </div>
          </main>

        {/* Cards here */}

        <ZoomTransition />
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
        <center className="w-100">
          <img src="/images/hero/juicy-girl.gif" className="animated-gif" alt="" loading="lazy" />
        </center>
        <span hidden>
          Illustration by <a href="https://icons8.com/illustrations/author/mNCLibjicqSz">Julia K</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
        </span>
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

export default Transition(Hero)
