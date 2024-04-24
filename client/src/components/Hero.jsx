import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { 
  faMicrochip,
  faArrowRight,
  faUser,
  faMoneyBill1Wave
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css'

function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero-container d-flex flex-column align-items-center">
        <h1 className='my-3'>Let's Build a Bright Future</h1>
        <p className="my-2">Create Test Papers with our powerful, simple <br /> and cost-effective solution</p>
        <button className='my-4'>Get Started <FontAwesomeIcon icon={faArrowRight}/></button>

        <div className="row w-100">
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
      </div>
    </>
  )
}

export default Hero
