import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import AdminPanel from "./components/AdminPanel"

import './App.css'
import Dashboard from "./components/Dashboard";
import ViewBooks from "./components/View-Books";
import AddBook from "./components/AddBook";
import AddChapter from "./components/AddChapter";
import Login from "./pages/Auth";
import BooksPanel from "./components/BooksPanel";

const ProtectedRoute = ({children, auth=false}) => {
  const { user } = useContext(UserContext)
  const isLoggedIn = user?.token || false;
  if(!isLoggedIn && auth){
    return <Navigate to={"/login"} />;
  }else if(isLoggedIn && ["/login"].includes(window.location.pathname)){
    return <Navigate to={"/"} />
  }
  return children;
}

function App() {
  const { user, logout } = useContext(UserContext);
  useEffect(()=>{
    const verifyLogin = async () => {
      const res = await fetch(import.meta.env.VITE_SERVER_URL+"/auth/verify", {
        method: "HEAD",
        headers: {
          Authorization: `Authorization ${user?.token}`
        }
      });

      if(res.status == 403){
        logout();
      }
    }
    if(user?.token){
      verifyLogin();
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={
            <ProtectedRoute auth={false}>
              <Login />
            </ProtectedRoute>} />
          {/* <Route exact path="/signup" element={
            <ProtectedRoute auth={false}>
            <SignUp2 />
            </ProtectedRoute>} /> */}
          <Route path="/" element={<ProtectedRoute auth={true}><AdminPanel /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="view-books" element={<ViewBooks />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="add-chapter" element={<AddChapter />} />
            
            <Route path="books" element={<BooksPanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
