import "./Auth.css";

import { useRef, useState } from "react";
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef()

  const onChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaToken) {
        alert("Please complete the CAPTCHA");
        return;
    }

    // Send the token to the backend for verification
    const response = await fetch('https://test-builder-iota.vercel.app/api/v1/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: captchaToken })
    });

    const data = await response.json();

    if (data.success) {
        alert("CAPTCHA verified and form submitted");
    } else {
        alert("CAPTCHA verification failed");
    }
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

          <div className="form">
            <div className="inputBox">
              <input type="text" required /> <i>Username</i>
            </div>

            <div className="inputBox">
              <input type="password" required /> <i>Password</i>
            </div>

            <div className="inputBox">
              <ReCAPTCHA
                  sitekey="6Lc2yyUqAAAAABty5muP2PVz10LxCkqzG_Mlejcy"
                  size="invisible"
                  ref={recaptchaRef}
              />
            </div>

            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;