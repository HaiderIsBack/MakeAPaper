import './Nav.css'
import { useNavigate } from 'react-router-dom'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faBarsStaggered,
    faFlask,
    faMoon,
    faSun
  } from '@fortawesome/free-solid-svg-icons';
import { useContext, useRef, useState } from 'react';
import UserContext from "../UserContext"

import {motion} from "framer-motion"

function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext)

  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <div className="nav-container my-3 px-3">
          <div className="nav-brand d-flex align-items-center" onClick={()=>navigate("/")}>
              <img src="/TestBuilder.png" alt="Test Builder" />
              <h3 className='mb-0 d-sm-block d-none'>Test Builder</h3>
          </div>
        <div className="nav-actions d-lg-flex d-none">
            <menu>
                {/* <li><button>Features</button></li> */}
                <li><button onClick={()=>navigate("/documentation")}>Documentation</button></li>
                <li><button onClick={()=>navigate("/plans")}>Plan & Pricings</button></li>
                <li><button>About Us</button></li>
            </menu>
        </div>
        <ThemeChangeButton />
        <div className="nav-account d-lg-block d-none">
          {
            user === null ? <button onClick={()=>navigate("/signup")}>Sign Up</button> : <button onClick={()=>navigate("/lab")}>My Lab <FontAwesomeIcon icon={faFlask} className='mx-2' /></button>
          }
        </div>
        <div className="nav-account d-lg-none d-block">
          <button onClick={()=>setIsActive(true)}><FontAwesomeIcon icon={faBarsStaggered} /></button>
          <Sidebar state={isActive} setState={setIsActive} navigate={navigate} />
        </div>
      </div>
    </>
  )
}

const Sidebar = ({state, setState, navigate}) => {
  return (
    <motion.div className="nav-sidebar" animate={{right: state ? 0 : "calc(0% - 300px)", transition: {ease: [0.76, 0, 0.24, 1], duration: 0.8}}}>
      <div className="nav-close" onClick={()=>setState(false)} />
      <div className="nav-brand d-flex align-items-center mt-5" onClick={()=>navigate("/")}>
          <img src="/TestBuilder.png" alt="Test Builder" style={{padding: "0.2rem", borderRadius: "50%", background: "white"}} />
          <h3 className='mb-0 d-sm-block d-none'>Test Builder</h3>
      </div>
      <menu>
          {/* <li><button>Features</button></li> */}
          <li>
            <button onClick={()=>navigate("/documentation")}>Documentation</button>
          </li>
          <li><button onClick={()=>navigate("/plans")}>Plan & Pricings</button></li>
          <li><button>About Us</button></li>
      </menu>
    </motion.div>
  )
}

const ThemeChangeButton = () => {
  const [darkMode, setDarkMode] = useState(true)
  const toggleBtnRef = useRef(null);

  const handleToggle = () => {
    const body = document.getElementsByTagName("body")[0];
    if(darkMode){
      body.classList.remove("light-mode")
      toggleBtnRef.current.classList.add("active")
    }else{
      body.classList.add("light-mode")
      toggleBtnRef.current.classList.remove("active")
    }
    setDarkMode(prev => !prev);
  }

  return (
    <button className='theme-toggle-btn' onClick={handleToggle} ref={toggleBtnRef}>
      <span><FontAwesomeIcon icon={!darkMode ? faSun : faMoon} /></span>
    </button>
  )
}

export default Nav
