import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import { BrowserRouter,Routes, Route, Navigate, useLocation } from "react-router-dom";

import Nav from './components/Nav';
import GlassBg from "./components/GlassBg";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import TestMaker from "./components/TestMaker";
import {Login, SignUp} from "./pages/Authentication";
import { useContext, useEffect } from "react";
import UserContext from "./UserContext";
import Footer from "./components/Footer";

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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {

  return (
    <>
      <GlassBg />
        
      <BrowserRouter>
        {/* Navbar */}
        <Nav />
        {/* Scroll to top */}
        <ScrollToTop />
        {/* Routes */}
        <Routes>
          <Route path="/">
            <Route index element={
              <>
                <Hero />
                <Footer />
              </>
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
    </>
  )
}

export default App
