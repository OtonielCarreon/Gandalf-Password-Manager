import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordManager from "./components/PasswordManageScreen/PasswordManager";
import LoginSignUp from "./components/LoginSignUp";
import ProfilePage from "./components/ProfilePage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />  {/* Default page */}
        <Route path="/passwords" element={<PasswordManager />} />  {/* Separate login page */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
      </Routes>
    </Router>
  );
};

export default App;
