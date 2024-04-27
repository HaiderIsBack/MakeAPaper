import './Authentication.css'
import {Form, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faEye,
    faEyeSlash
  } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [errorOccured,setErrorOccured] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")

  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const formRef = useRef(null)

  const handlePasswordToggle = () => {
    showPassword ? passwordRef.current.type = "password" : passwordRef.current.type = "text";
    setShowPassword(current => !current)
  }

  const handleConfirmPasswordToggle = () => {
    showConfirmPassword ? confirmPasswordRef.current.type = "password" : confirmPasswordRef.current.type = "text";
    setShowConfirmPassword(current => !current)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current);
    const username = formData.get("username").toLowerCase().trim();
    const email = formData.get("email").toLowerCase().trim();
    const password = formData.get("password").trim();
    const confirmPassword = formData.get("confirmPassword").trim();

    const generateError = (msg, duration = 8000) => {
      setErrorMessage(msg)
      setErrorOccured(true);
      setTimeout(()=>setErrorOccured(false),duration);
    }

    if(!username || !email || !password || !confirmPassword){
      generateError("please complete the Form")
      return;
    }else{
      if(password !== confirmPassword){
        generateError("password and confirm password doesn't Match");
        return;
      }else{
        if(password.length < 8){
          generateError("password length must be greater than 8 Characters");
          return;
        }else{
          const finalData = {
            username,
            email,
            password
          }
          fetch("/api/v1/register",{
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(finalData),
            method: "POST"
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
            generateError("hi",12000);
          });
        }
      }
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="box">
            <h2 className='my-1'>SIGN UP</h2>
            <form ref={formRef} className='text-left d-flex flex-column'>
                <label className='mt-3'>Username</label>
                <input type="text" name="username" />
                <label className='mt-3'>Email</label>
                <input type="email" name="email" />
                <label className='mt-3'>Password</label>
                <div className="show-hide-password">
                  <input type="password" ref={passwordRef} name='password' />
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='show-hide-password-icon' onClick={handlePasswordToggle} />
                </div>
                <label className='mt-3'>Confirm Password</label>
                <div className="show-hide-password">
                  <input type="password" ref={confirmPasswordRef} name='confirmPassword' />
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className='show-hide-password-icon' onClick={handleConfirmPasswordToggle} />
                </div>
                <p className='my-2'>Already have an Account? <a onClick={()=>navigate("/login")}>Login</a> Now</p>
                {errorOccured ? <p className="alert alert-danger" style={{maxWidth: "300px"}}><strong>Error!</strong> {errorMessage}</p> : null}

                <button onClick={handleRegister} className='btn mt-3'>Create Account</button>
            </form>
        </div>
      </div>
    </>
  )
}

function Login() {
  const navigate = useNavigate();

  const [errorOccured,setErrorOccured] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")

  const formRef = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current);
    const username = formData.get("username").toLowerCase().trim();
    const password = formData.get("password").trim();

    const generateError = (msg, duration = 8000) => {
      setErrorMessage(msg)
      setErrorOccured(true);
      setTimeout(()=>setErrorOccured(false),duration);
    }

    if(!username || !password){
      generateError("please complete the Form")
      return;
    }else{
      const finalData = {
        username,
        password
      }
      fetch("/api/v1/login",{
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalData),
        method: "POST"
      })
      .then(res => {
        console.log(res)
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        generateError("hi",12000);
      });
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="box">
            <h2 className='my-5'>LOGIN</h2>
            <form ref={formRef} className='text-left d-flex flex-column'>
                <label className='mt-3'>Username</label>
                <input type="text" name="username" />
                <label className='mt-3'>Password</label>
                <input type="password" name="password" />
                
                <p className='my-2'>Don't have an Account? <a onClick={()=>navigate("/signup")}>Create</a> One</p>
                {errorOccured ? <p className="alert alert-danger" style={{maxWidth: "300px"}}><strong>Error!</strong> {errorMessage}</p> : null}

                <button onClick={handleLogin} className='btn mt-3'>Login</button>
            </form>
        </div>
      </div>
    </>
  )
}

export {
  SignUp,
  Login
}
