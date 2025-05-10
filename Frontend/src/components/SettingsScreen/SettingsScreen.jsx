import React, { useState, useEffect } from "react";
import SettingsSidebar from "./SettingsSidebar";
import SettingsMainPanel from "./SettingsMainPanel";
import settingsStyles from "./settingsStyles"; 
import useAutoLock from "./useAutoLock";

export default function SettingsScreen() {
  const [selectedSetting, setSelectedSetting] = useState("Account");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [autoLock, setAutoLock] = useState(Number(localStorage.getItem("autoLock")) || 10);
  useEffect(() => {
    const interval = setInterval(() => {
      const newLock = Number(localStorage.getItem("autoLock")) || 10;
      setAutoLock(newLock);
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  useAutoLock(autoLock);


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div style={isDarkMode ? settingsStyles.darkContainer : settingsStyles.container}>
      <div style={{ display: "flex", flex: 1 }}>
        <SettingsSidebar 
          selectedSetting={selectedSetting} 
          onSelect={setSelectedSetting} 
          isDarkMode={isDarkMode} 
        />
        <SettingsMainPanel 
          selectedSetting={selectedSetting} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />
      </div>
    </div>
  );
}
