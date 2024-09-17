import './Authentication.css'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useContext } from 'react';
import BarLoader from "react-spinners/BarLoader";
import UserContext from '../UserContext';
import Transition from '../components/Transition';
import axios from 'axios';

const overrideCSS = {
  display: "block",
  margin: "0 auto",
};

function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [errorOccured,setErrorOccured] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");

  const formRef = useRef(null);

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
      // Preparing for Server Request
      const payload = {
        username,
        password
      }

      setLoading(true);
      const response = await axios.post(import.meta.env.VITE_SERVER_URL+"/login", payload)

      if(response.data.success){
        setUser({user: response.data.user, token: response.data.token})
        const prevRoute = state?.prevLoc ? state.prevLoc : "/"
        navigate(prevRoute)
      }else{
        generateError(response.data.msg, 5000)
        return
      }
      setLoading(false);
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
                
                <button onClick={handleLogin} className='btn mt-3' disabled={loading}>
                  {
                  loading ? <BarLoader
                      color={"white"}
                      loading={loading}
                      size={50}
                      cssOverride={overrideCSS}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /> : "Login"
                  }
                </button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Transition(Login)
