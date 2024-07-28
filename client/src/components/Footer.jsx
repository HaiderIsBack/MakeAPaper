import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEnvelope,
    faHome,
    faPhone
  } from '@fortawesome/free-solid-svg-icons';

  import { 
    faFacebook,
    faGithub,
    faLinkedin,
    faYoutube
  } from '@fortawesome/free-brands-svg-icons';

import { Link } from "react-router-dom";

const Footer = () => {
    return (<>
        <div className="footer mt-5 pt-2">
            <div className="row w-100 py-3">
                <div className="col-md-3 col-12 d-flex flex-column info-links">
                    <div className="d-flex align-items-center px-4 mb-3">
                        <img src="/TestBuilder.png" alt="Test Builder" />
                        <h3 className="mb-0" style={{textWrap: "nowrap"}}>Test Builder</h3>
                    </div>
                    <a href="mailto:testbuilder.atomicsolutions@gmail.com" className="pl-2 my-1  text-left"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> test***solutions@gmail.com</a>
                    <a href="tel:+923278848936" className="pl-2 my-1 text-left"><FontAwesomeIcon icon={faPhone} className="mr-2" /> (+92)327-8848936</a>
                    <address className="text-left pl-2">
                        <FontAwesomeIcon icon={faHome} className="mr-2" /> 3rd Floor, Al Qadeer Heights, Mozang Chungi, Punjab, Lahore
                    </address>
                </div>
                <div className="col-md-3 col-12 d-flex flex-column pages-links">
                    <h4>Pages</h4>
                    <ul>
                        <li><Link to={"/lab"}>Dashboard</Link></li>
                        <li><Link to={"/documentation"}>Documentation</Link></li>
                        <li><Link to={"/plans"}>Pricings</Link></li>
                        <li><Link to={"/about-us"}>About Us</Link></li>
                    </ul>
                </div>
                <div className="col-md-3 col-12 d-flex flex-column social-links">
                    <h4 className="mb-3">Socials</h4>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank"><FontAwesomeIcon icon={faFacebook}/></a></li>
                        <li><a href="https://linkedin.com" target="_blank"><FontAwesomeIcon icon={faLinkedin}/></a></li>
                        <li><a href="https://github.com" target="_blank"><FontAwesomeIcon icon={faGithub}/></a></li>
                        <li><a href="https://youtube.com" target="_blank"><FontAwesomeIcon icon={faYoutube}/></a></li>
                    </ul>
                </div>
                <div className="col-md-3 col-12 bg-danger"></div>
            </div>
            <div className="w-100 text-light py-2 text-center lower-footer" style={{background: "#111"}}>
                <h6 className="mb-0">Copyright Reserved © Test Builder {new Date().getFullYear()} by <span>Atomic Solutions</span></h6>
            </div>
        </div>
    </>)
}

export default Footer