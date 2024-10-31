import "./Auth.css";

import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';
import UserContext from "../context/UserContext";

import DOMPurify from 'dompurify';

function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef(null);

  const { setUser } = useContext(UserContext);

  const handleRecaptchaValidation = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = recaptchaToken;
    
    if (!token) {
        alert("Please complete the CAPTCHA");
        return;
    }

    const formData = new FormData(formRef.current);
    const username = sanitizeInput(formData.get("username"));
    const password = sanitizeInput(formData.get("password"));

    const payload = {
      username,
      password
    }

    setLoading(true);
    const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/login", payload);

    if(response.data.success){
      setUser({user: response.data.user, token: response.data.token});
      navigate("/");
      setLoading(false);
      return;
    }else{
      setLoading(false);
      setErrorMsg(response.data.msg);
      setTimeout(()=>{
        setErrorMsg("");
      }, 5000);
      return;
    }
  };

  return (
  <>
    <div className="auth">
      <form onSubmit={handleSubmit} ref={formRef}>
        <img src="/asterik.png" alt="asterik" loading="lazy" />
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <div className="password-input">
          <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} className="password-eye-icon" onClick={() => setShowPassword(prev => !prev)} />
          <input type={showPassword ? "text" : "password"} id="password" name="password" required />
        </div>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <ReCAPTCHA
                sitekey={import.meta.env.VITE_SITE_KEY}
                onChange={handleRecaptchaValidation}
                style={{margin: "10px 0"}}
            />
        <button type="submit" disabled={loading} style={{cursor: loading ? "progress" : "pointer"}}>{loading ? "Logging In" : "Login"}</button>
      </form>
    </div>
  </>);
}

const SignUp2 = () => {
  return (
  <>
    <div className="auth">
      <form action="">
        <img src="/asterik.png" alt="asterik" loading="lazy" />
        <h2>SignUp</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
        <label htmlFor="password">Password</label>
        <div className="password-input">
          <FontAwesomeIcon icon={faEye} className="password-eye-icon" />
          <input type="password" id="password" required />
        </div>
        <label htmlFor="confirmPassword">Re-Type Password</label>
        <div className="password-input">
          <FontAwesomeIcon icon={faEye} className="password-eye-icon" />
          <input type="password" id="confirmPassword" required />
        </div>
        <p>Already have an account? <Link to={"/login"}>Login</Link>.</p>
        <button type="submit">Create Account</button>
      </form>
    </div>
  </>);
}

export default Login;