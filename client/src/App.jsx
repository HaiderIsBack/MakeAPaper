import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

import Nav from "./components/Nav";
import GlassBg from "./components/GlassBg";
import Hero from "./components/Hero";
import Plans from "./components/Plans";
import Documentation from "./pages/Documentation";
import TestMaker from "./components/TestMaker";
import Login from "./pages/Login";
import SignUp  from "./pages/SignUp";
import Footer from "./components/Footer";

import { AnimatePresence } from "framer-motion";
import useLenis from "./components/useLenis";

const ProtectedRoute = ({ children, auth = false }) => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user?.token || false;
  if (!isLoggedIn && auth) {
    return <Navigate to={"/login"} />;
  } else if (
    isLoggedIn &&
    ["/login", "/signup"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  useLenis();
  const location = useLocation();
  return (
    <>
      <GlassBg />

      {/* Navbar */}
      <Nav />
      {/* Scroll to top */}
      <ScrollToTop />
      {/* Routes */}

      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          index
          element={<>
            <Hero />
            <Footer />
            </>
          }
        />
        <Route path="/plans" element={
          <>
            <Plans />
            <Footer />
          </>
        } />

        <Route
          path="/paper"
          element={
            <ProtectedRoute auth={true}>
              <TestMaker />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <ProtectedRoute auth={false}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute auth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documentation"
          element={
            <>
              <Documentation />
              {/* <Footer /> */}
            </>
          }
        />
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
