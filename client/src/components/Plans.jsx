import './Plans.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
  faCheckSquare,
  faXmarkSquare,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import './Hero.css'
import Zoop from './Zoop';
import Transition from './Transition';

function Plans() {

  return (
    <>
      <div className="plans-container hero-container">
        <h2 className='my-5 text-left'><Zoop>Plans</Zoop></h2>
        <div className="row hero-cards justify-content-center px-2">
            <div className="col-lg-4 col-12 my-lg-0 my-3 hero-cols">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <h3 className="m-0">Basic</h3>
                  </div>
                  <h4 className="my-2">Rs. 500/month</h4>
                  <ul>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Simple Paper (Default)</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>24 / 7 Customer Service</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Customized Tests</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Watermark Custom</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Random Questions</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Full Book and Half Book Tests</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Board Paper Template</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Full Chapter</p></li>
                  </ul>
                  <button className='mt-0'>Coming Soon... <FontAwesomeIcon icon={faLock}/></button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 my-lg-0 my-3 hero-cols">
              <div className="card-container">
                <div className="card-content most-popular d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <h3 className="m-0">Economic</h3>
                  </div>
                  <h4 className="my-2">Rs. 1500/month</h4>
                  <ul>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Simple Paper (Default)</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>24 / 7 Customer Service</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Customized Tests</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Watermark Custom</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Random Questions</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Full Book and Half Book Tests</p></li>
                    <li><FontAwesomeIcon icon={faXmarkSquare} className='feature-excluded' /> <p>Board Paper Template</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Full Chapter</p></li>
                  </ul>
                  <button className='mt-0'>Coming Soon <FontAwesomeIcon icon={faLock}/></button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 my-lg-0 my-3 hero-cols">
              <div className="card-container">
                <div className="card-content d-flex flex-column align-items-center">
                  <div className="card-icon">
                    <h3 className="m-0">Business</h3>
                  </div>
                  <h4 className="my-2">Rs. 3000/month</h4>
                  <ul>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Simple Paper (Default)</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>24 / 7 Customer Service</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Customized Tests</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Watermark Custom</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Random Questions</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Full Book and Half Book Tests</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Board Paper Template</p></li>
                    <li><FontAwesomeIcon icon={faCheckSquare} className='feature-included' /> <p>Full Chapter</p></li>
                  </ul>
                  <button className='mt-0'>Coming Soon <FontAwesomeIcon icon={faLock}/></button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Transition(Plans)
