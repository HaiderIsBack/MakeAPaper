import "./Auth.css";

import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';
import UserContext from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

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
    const username = formData.get("username");
    const password = formData.get("password");

    const payload = {
      username,
      password
    }

    setLoading(true);
    const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/login", payload)

    console.warn(response);

    if(response.data.success){
      setUser({user: response.data.user, token: response.data.token})
      navigate("/")
    }else{
      return
    }
    setLoading(false);
  };
  return (
    <section className="auth-back">
      {" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <div className="auth">
        <div className="content">
          <h2>LOGIN</h2>

          <form className="form" onSubmit={handleSubmit} ref={formRef}>
            <div className="inputBox">
              <input type="text" name="username" required /> <i>Username</i>
            </div>

            <div className="inputBox">
              <input type="password" name="password" required /> <i>Password</i>
            </div>

            <div className="inputBox">
              <ReCAPTCHA
                  sitekey={import.meta.env.VITE_SITE_KEY}
                  onChange={handleRecaptchaValidation}
              />
            </div>

            <div className="inputBox">
              <button type="submit">{loading ? "Wait a moment" : "Login"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export const Login2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
  <>
    <div className="auth-2">
      <form action="">
        <img src="/asterik.png" alt="asterik" loading="lazy" />
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
        <label htmlFor="password">Password</label>
        <div className="password-input">
          <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} className="password-eye-icon" onClick={() => setShowPassword(prev => !prev)} />
          <input type={showPassword ? "text" : "password"} id="password" required />
        </div>
        {/* <p>Want to create a new account? <Link to={"/signup"}>Register</Link>.</p> */}
        <button type="submit">Login</button>
      </form>
    </div>
  </>);
}

export const SignUp2 = () => {
  return (
  <>
    <div className="auth-2">
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