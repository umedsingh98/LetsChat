import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain ">
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/profile" Component={ProfilePage} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
