import './Nav.css'
import { useNavigate } from 'react-router-dom'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faBarsStaggered
  } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav-container my-3 p-2 px-3">
          <div className="nav-brand d-flex align-items-center" onClick={()=>navigate("/")}>
              <img src="/images/MakePaper.png" alt="MakePaper" />
              <h3 className='mb-0 d-sm-block d-none'>Make Paper</h3>
          </div>
        <div className="nav-actions d-lg-flex d-none">
            <menu>
                <li><button>Features</button></li>
                <li><button>Documentation</button></li>
                <li><button onClick={()=>navigate("/plans")}>Plan & Pricings</button></li>
                <li><button>About Us</button></li>
            </menu>
        </div>
        <div className="nav-account d-lg-block d-none">
            <button onClick={()=>navigate("/signup")}>Sign Up</button>
        </div>
        <div className="nav-account d-lg-none d-block">
          <button><FontAwesomeIcon icon={faBarsStaggered} /></button>
        </div>
      </div>
    </>
  )
}

export default Nav
