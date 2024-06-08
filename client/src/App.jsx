import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

import Nav from './components/Nav';
import GlassBg from "./components/GlassBg";
import Hero from "./components/Hero";
import Subscription from "./components/Subscription";
import TestMaker from "./components/TestMaker";
import {Login, SignUp} from "./pages/Authentication";

const ProtectedRoute = ({children, auth=false}) => {
  const isLoggedIn = localStorage.getItem("user:token") || false
  if(!isLoggedIn && auth){
    return <Navigate to={"/login"} />;
  }else if(isLoggedIn && ["/login","/signup"].includes(window.location.pathname)){
    return <Navigate to={"/"} />
  }
  return children;
}

function App() {

  return (
    <>
      <div className="container">
        <GlassBg />
        
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/">
              <Route index element={<Hero />} />
              <Route path="plans" element={<Subscription />} />
              
              <Route path="paper" element={
                <ProtectedRoute auth={true}>
                  <TestMaker />
                </ProtectedRoute>
              } />
              
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
