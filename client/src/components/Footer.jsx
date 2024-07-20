import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEnvelope,
    faHome,
    faPhone
  } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (<>
        <div className="footer w-100 mt-5 pt-2">
            <div className="row py-3">
                <div className="col-md-3 col-12 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center px-4 mb-3">
                        <img src="/TestBuilder.png" alt="Test Builder" />
                        <h3 className="mb-0" style={{textWrap: "nowrap"}}>Test Builder</h3>
                    </div>
                    <a href="mailto:testbuilder.atomicsolutions@gmail.com" className="pl-2 my-1 text-secondary text-left"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> test***solutions@gmail.com</a>
                    <a href="tel:+923278848936" className="pl-2 my-1 text-secondary text-left"><FontAwesomeIcon icon={faPhone} className="mr-2" /> (+92)327-8848936</a>
                    <address className="text-secondary text-left pl-2">
                        <FontAwesomeIcon icon={faHome} className="mr-2" /> 3rd Floor, Al Qadeer Heights, Mozang Chungi, Punjab, Lahore
                    </address>
                </div>
                <div className="col-md-3 col-12 bg-warning"></div>
                <div className="col-md-3 col-12 bg-primary"></div>
                <div className="col-md-3 col-12 bg-danger"></div>
            </div>
            <div className="w-100 text-light py-2 text-center" style={{background: "#111"}}>
                <h6 className="mb-0">Copyright Reserved @ Test Builder {new Date().getFullYear()}</h6>
            </div>
        </div>
    </>)
}

export default Footer