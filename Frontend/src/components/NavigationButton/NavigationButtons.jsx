import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Navigation Buttons Component
const NavigationButtons = () => {
    const navigate = useNavigate();

    return (
        <div style={{ marginBottom: "0px" }}>
        <button onClick={() => navigate("/passwords")} style={buttonStyle}>Home</button>
        <button onClick={() => navigate("/profile")} style={buttonStyle}>Profile</button>
        <button onClick={() => navigate("/settings")} style={buttonStyle}>Settings</button>
        </div>
    );
};

// Button styles
const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

export default NavigationButtons;