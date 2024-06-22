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

      {/* News Letter */}
    </>
  )
}

export default Hero
