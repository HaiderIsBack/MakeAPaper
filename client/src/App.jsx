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
import { Dashboard,UserTests,Account,News } from "./pages/Lab"
import Lab from "./pages/Lab"

import Login from "./pages/Login";
import SignUp  from "./pages/SignUp";

import Footer from "./components/Footer";

import { AnimatePresence } from "framer-motion";
import PrivacyPolicy from "./pages/Privacy Policy";

const ProtectedRoute = ({ children, auth = false }) => {
  const { user } = useContext(UserContext);
  const isLoggedIn = user?.token || false;
  if (!isLoggedIn && auth) {
    const state = {prevLoc: window.location.pathname}
    return <Navigate to={"/login"} state={state} />;
  }
  else if (
    isLoggedIn &&
    ["/login", "/signup"].includes(window.location.pathname)
  ) {
    console.log('why')
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
            </>
          }
        />
        <Route path="/plans" element={
          <>
            <Plans />
          </>
        } />

        <Route
          path="/lab"
          element={
            <Lab />
          }
        >
          <Route index element={<ProtectedRoute auth={true}><Dashboard /></ProtectedRoute>} />
          <Route path="tests" element={<ProtectedRoute auth={true}><UserTests /></ProtectedRoute>} />
          <Route path="account" element={<ProtectedRoute auth={true}><Account /></ProtectedRoute>} />
          <Route path="news" element={<ProtectedRoute auth={true}><News /></ProtectedRoute>} />
        </Route>

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
            </>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <>
              <PrivacyPolicy />
            </>
          }
        />
      </Routes>
      </AnimatePresence>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
