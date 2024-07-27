import './Nav.css'
import { useNavigate } from 'react-router-dom'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faBarsStaggered,
    faFlask,
  } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import UserContext from "../UserContext"

function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext)
  return (
    <>
      <div className="nav-container my-3 p-2 px-3">
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
        <div className="nav-account d-lg-block d-none">
          {
            user === null ? <button onClick={()=>navigate("/signup")}>Sign Up</button> : <button onClick={()=>navigate("/lab")}>My Lab <FontAwesomeIcon icon={faFlask} className='mx-2' /></button>
          }
            
        </div>
        <div className="nav-account d-lg-none d-block">
          <button><FontAwesomeIcon icon={faBarsStaggered} /></button>
        </div>
      </div>
    </>
  )
}

export default Nav
