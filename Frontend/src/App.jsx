import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PasswordManager from "./components/PasswordManageScreen/PasswordManager";
import LoginSignUp from "./components/LoginSignUp";
import ProfilePage from "./components/ProfilePage.jsx";
import SettingsScreen from "./components/SettingsScreen/SettingsScreen.jsx"

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LoginSignUp />} />  {/* Default page */}
    //     <Route path="/passwords" element={<PasswordManager />} />  {/* Password Page */}
    //     <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
    //     <Route path="/settings" element={<SettingsScreen />} /> {/* Settings Page */}
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
      </Routes>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Routes>
            <Route path="/passwords" element={<PasswordManager />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
    </Router>
  );
};

export default App;
