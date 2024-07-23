import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from "./UserContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </UserProvider>
  ,
)
