import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { Toaster } from 'react-hot-toast'
import { AuthContext } from "../context/AuthContext.jsx";

const App = () => {

  const { authUser } = useContext(AuthContext);
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain ">
      <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/" /> } />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
