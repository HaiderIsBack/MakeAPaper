import './Authentication.css'
import {useNavigate} from "react-router-dom";
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

  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handlePasswordToggle = () => {
    showPassword ? passwordRef.current.type = "password" : passwordRef.current.type = "text";
    setShowPassword(current => !current)
  }

  const handleConfirmPasswordToggle = () => {
    showConfirmPassword ? confirmPasswordRef.current.type = "password" : confirmPasswordRef.current.type = "text";
    setShowConfirmPassword(current => !current)
  }
  return (
    <>
      <div className="auth-container">
        <div className="box">
            <h2 className='my-5'>SIGN UP</h2>
            <form action="" method="post" className='text-left d-flex flex-column'>
                <label className='mt-3'>Username</label>
                <input type="text" name="" id="" />
                <label className='mt-3'>Email</label>
                <input type="email" name="" id="" />
                <label className='mt-3'>Password</label>
                <div className="show-hide-password">
                  <input type="password" ref={passwordRef} id="" />
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='show-hide-password-icon' onClick={handlePasswordToggle} />
                </div>
                <label className='mt-3'>Confirm Password</label>
                <div className="show-hide-password">
                  <input type="password" ref={confirmPasswordRef} id="" />
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className='show-hide-password-icon' onClick={handleConfirmPasswordToggle} />
                </div>
                <p className='my-2'>Already have an Account? <a onClick={()=>navigate("/login")}>Login</a> Now</p>

                <button type="submit" className='btn mt-3'>Create Account</button>
            </form>
        </div>
      </div>
    </>
  )
}

function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth-container">
        <div className="box">
            <h2 className='my-5'>LOGIN</h2>
            <form action="" method="post" className='text-left d-flex flex-column'>
                <label className='mt-3'>Email</label>
                <input type="email" name="" id="" />
                <label className='mt-3'>Password</label>
                <input type="password" name="" id="" />
                
                <p className='my-2'>Don't have an Account? <a onClick={()=>navigate("/signup")}>Create</a> One</p>

                <button type="submit" className='btn mt-3'>Login</button>
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
