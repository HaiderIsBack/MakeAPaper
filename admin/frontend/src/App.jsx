import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import AdminPanel from "./components/AdminPanel"

import "bootstrap/dist/css/bootstrap.css";
import './App.css'
import Dashboard from "./components/Dashboard";
import ViewBooks from "./components/View-Books";
import AddBook from "./components/AddBook";
import AddChapter from "./components/AddChapter";
import Login, { Login2 } from "./pages/Auth";

const ProtectedRoute = ({children, auth=false}) => {
  // const { user } = useContext(UserContext)
  const isLoggedIn = false
  if(!isLoggedIn && auth){
    return <Navigate to={"/login"} />;
  }else if(isLoggedIn && ["/login"].includes(window.location.pathname)){
    return <Navigate to={"/"} />
  }
  return children;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={
            <ProtectedRoute auth={false}>
            <Login2 />
            </ProtectedRoute>} />
          {/* <Route exact path="/signup" element={
            <ProtectedRoute auth={false}>
            <SignUp2 />
            </ProtectedRoute>} /> */}
          <Route path="/" element={<AdminPanel />}>
            <Route index element={<Dashboard />} />
            <Route path="view-books" element={<ViewBooks />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="add-chapter" element={<AddChapter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
