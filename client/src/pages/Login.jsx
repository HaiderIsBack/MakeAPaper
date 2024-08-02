import './Authentication.css'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import UserContext from '../UserContext';
import Transition from '../components/Transition';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const { state } = useLocation()

  const { setUser } = useContext(UserContext)

  const [errorOccured,setErrorOccured] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")

  const formRef = useRef(null)

  const handleLogin = async (e) => {
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
      const payload = {
        username,
        password
      }

      const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/login", payload)

      if(response.data.success){
        setUser({user: response.data.user, token: response.data.token})
        const prevRoute = state?.prevLoc ? state.prevLoc : "/"
        navigate(prevRoute)
      }else{
        generateError(response.data.msg, 5000)
        return
      }

      // fetch(import.meta.env.VITE_SERVER_URL+"/login",{
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(payload),
      //   method: "POST"
      // })
      // .then(res => {
      //   if(res.status === 200 || res.status === 400){
      //     return res.json()
      //   }else if(res.status === 500){
      //     generateError("Server Error: 500")
      //   }
      // })
      // .then(data => {
      //   if(data.msg){
      //     generateError(data.msg, 5000)
      //     return
      //   }
      //   setUser(data)
      //   const prevRoute = state?.prevLoc ? state.prevLoc : "/"
      //   navigate(prevRoute)
      // })
      // .catch(error => {
      //   console.log(error)
      // });
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
            <h2 className='my-5 text-center'>LOGIN</h2>
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

export default Transition(Login)
