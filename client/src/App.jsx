import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

import Nav from './components/Nav';
import GlassBg from "./components/GlassBg";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import TestMaker from "./components/TestMaker";
import {Login, SignUp} from "./pages/Authentication";
import { useContext } from "react";
import UserContext from "./UserContext";

const ProtectedRoute = ({children, auth=false}) => {
  const { user } = useContext(UserContext)
  const isLoggedIn = user?.token || false
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
              <Route index element={
                <Hero />
              } />
              <Route path="plans" element={<Plans />} />
              
              <Route path="paper" element={
                <ProtectedRoute auth={true}>
                  <TestMaker />
                </ProtectedRoute>
              } />
              
              <Route path="signup" element={
                <ProtectedRoute auth={false}>
                  <SignUp />
                </ProtectedRoute>
              } />
              <Route path="login" element={
                <ProtectedRoute auth={false}>
                  <Login />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
