import React, { useState, useEffect } from "react";
import settingsStyles from "./settingsStyles";

export default function SettingsMainPanel({ selectedSetting, isDarkMode, setIsDarkMode }) {
  const [password, setPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [autoLock, setAutoLock] = useState(localStorage.getItem("autoLock") || 10);

  const handlePasswordChange = () => {
    localStorage.setItem("password", password);
    alert("Password updated successfully!");
    setIsEditingPassword(false);
  };

  const handleAutoLockChange = (e) => {
    const value = e.target.value;
    setAutoLock(value);
    localStorage.setItem("autoLock", value);
  };

  return (
    <div style={isDarkMode ? settingsStyles.darkMainPanel : settingsStyles.mainPanel}>
      <h3 style={settingsStyles.sectionTitle}>{selectedSetting}</h3>

      {selectedSetting === "Account" && (
        <div style={isDarkMode ? settingsStyles.darkCard : settingsStyles.card}>
          <h4>Change Password</h4>
          {isEditingPassword ? (
            <div>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={settingsStyles.wideInput}
              />

              <div style={settingsStyles.buttonContainer}>
                <button style={settingsStyles.successButton} onClick={handlePasswordChange}>
                  Save
                </button>
                <button style={settingsStyles.secondaryButton} onClick={() => setIsEditingPassword(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button style={settingsStyles.actionButton} onClick={() => setIsEditingPassword(true)}>
              Update Password
            </button>
          )}
        </div>
      )}

      {selectedSetting === "Security" && (
        <div style={isDarkMode ? settingsStyles.darkCard : settingsStyles.card}>
          <h4>Security Preferences</h4>
          <label style={settingsStyles.label}>
            Auto-lock timeout:
            <input
              type="number"
              value={autoLock}
              onChange={handleAutoLockChange}
              style={settingsStyles.input}
              min="1"
            />
            mins
          </label>
        </div>
      )}

      {selectedSetting === "Appearance" && (
        <div style={isDarkMode ? settingsStyles.darkCard : settingsStyles.card}>
          <h4>Theme Preferences</h4>
          <label style={settingsStyles.checkbox}>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            Enable Dark Mode
          </label>
        </div>
      )}

      {selectedSetting === "Export & Import" && (
        <div style={isDarkMode ? settingsStyles.darkCard : settingsStyles.card}>
          <h4>Data Management</h4>
          <button style={settingsStyles.successButton}>Export Vault</button>
          <button style={settingsStyles.secondaryButton}>Import Vault</button>
        </div>
      )}

      {selectedSetting === "Delete Account" && (
        <div style={{ ...settingsStyles.card, ...settingsStyles.dangerCard }}>
          <h4 style={settingsStyles.dangerText}>Delete Account</h4>
          <p>This action is irreversible.</p>
          <button style={settingsStyles.dangerButton}>Delete Account</button>
        </div>
      )}
    </div>
  );
}
