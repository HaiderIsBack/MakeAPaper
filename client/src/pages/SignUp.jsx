import './Authentication.css'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { 
    faEye,
    faEyeSlash
  } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';
import Transition from '../components/Transition';

function SignUp() {
  const navigate = useNavigate();

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [errorOccured,setErrorOccured] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const [successOccured,setSuccessOccured] = useState(false)
  const [successMessage,setSuccessMessage] = useState("")

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

  const handleRegister = async (e) => {
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

    const generateSuccess = (msg, duration = 8000) => {
      setSuccessMessage(msg)
      setSuccessOccured(true);
      setTimeout(()=>setSuccessOccured(false),duration);
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
          // Preparing for Server Request
          const payload = {
            username,
            email,
            password
          }

          const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/register", payload)
          
          if(response.data.success){
            generateSuccess(response.data.msg, 5000)
            setTimeout(() => navigate("/login"), 5000)
          }else{
            generateError(response.data.msg, 5000)
            return
          }
        }
      }
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
            <h2 className='my-1 text-center'>SIGN UP</h2>
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
                {successOccured ? <p className="alert alert-success" style={{maxWidth: "300px"}}><strong>Success!</strong> {successMessage}</p> : null}

                <button onClick={handleRegister} className='btn mt-3'>Create Account</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Transition(SignUp)
