import './Authentication.css'
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import UserContext from '../UserContext';
import Transition from '../components/Transition';

function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext)

  const [errorOccured,setErrorOccured] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const [successOccured,setSuccessOccured] = useState(false)
  const [successMessage,setSuccessMessage] = useState("")

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

    const generateSuccess = (msg, duration = 8000) => {
      setSuccessMessage(msg)
      setSuccessOccured(true);
      setTimeout(()=>setSuccessOccured(false),duration);
    }

    if(!username || !password){
      generateError("please complete the Form")
      return;
    }else{
      const payload = {
        username,
        password
      }
      fetch(import.meta.env.VITE_SERVER_URL+"/login",{
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        method: "POST"
      })
      .then(res => {
        if(res.status === 200 || res.status === 400){
          return res.json()
        }else if(res.status === 500){
          generateError("Server Error: 500")
        }
      })
      .then(data => {
        if(data.msg){
          generateError(data.msg, 5000)
          return
        }
        setUser(data)
        generateSuccess("Login Successfull", 3000)
        setTimeout(() => navigate("/"), 3000)
      })
      .catch(error => {
        console.log(error)
      });
    }
  }
  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
            <h2 className='my-5'>LOGIN</h2>
            <form ref={formRef} className='text-left d-flex flex-column'>
                <label className='mt-3'>Username</label>
                <input type="text" name="username" />
                <label className='mt-3'>Password</label>
                <input type="password" name="password" />
                
                <p className='my-2'>Don't have an Account? <a onClick={()=>navigate("/signup")}>Create</a> One</p>
                {errorOccured ? <p className="alert alert-danger" style={{maxWidth: "300px"}}><strong>Error!</strong> {errorMessage}</p> : null}
                {successOccured ? <p className="alert alert-success" style={{maxWidth: "300px"}}><strong>Success!</strong> {successMessage}</p> : null}

                <button onClick={handleLogin} className='btn mt-3'>Login</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Transition(Login)
