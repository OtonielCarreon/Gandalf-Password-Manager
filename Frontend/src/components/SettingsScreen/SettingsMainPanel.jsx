import React, { useState, useEffect } from "react";
import settingsStyles from "./settingsStyles";

export default function SettingsMainPanel({ selectedSetting, isDarkMode, setIsDarkMode }) {
  const [password, setPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [autoLock, setAutoLock] = useState(localStorage.getItem("autoLock") || 10);
  const [successMessage, setSuccessMessage] = useState(""); 

  const handlePasswordChange = async () => {
    try {
      const response = await fetch("http://localhost:5001/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password }),
      });

      if (response.ok) {
        setSuccessMessage("Password updated successfully!");
        setTimeout(() => setSuccessMessage(""), 1000); 
        setIsEditingPassword(false);
        setPassword("");
      } else {
        const data = await response.json();
        alert("Error updating password: " + data.error);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Something went wrong.");
    }
  };

  const handleAutoLockChange = (e) => {
    const value = e.target.value;
    setAutoLock(value);
    localStorage.setItem("autoLock", value);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const response = await fetch("http://localhost:5001/delete-account", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Account deleted successfully!");
        localStorage.clear();
        window.location.href = "/";
      } else {
        const data = await response.json();
        alert("Error deleting account: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Something went wrong.");
    }
  };

  const handleExportVault = async () => {
    try {
      const response = await fetch("http://localhost:5001/export-vault");
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "vault_backup.json";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting vault:", error);
      alert("Error exporting vault.");
    }
  };
  

  const handleImportVault = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        const response = await fetch("http://localhost:5001/import-vault", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vault: importedData }),
        });

        if (response.ok) {
          alert("Vault imported successfully!");
          window.location.reload();
        } else {
          const data = await response.json();
          alert("Error importing vault: " + data.error);
        }
      } catch (error) {
        console.error("Error importing vault:", error);
        alert("Invalid file format or upload failed.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={isDarkMode ? settingsStyles.darkMainPanel : settingsStyles.mainPanel}>
      {successMessage && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#0d47a1",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "14px",
        }}>
          {successMessage}
        </div>
      )}

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
          <button style={settingsStyles.successButton} onClick={handleExportVault}>
            Export Vault
          </button>
          <label style={{ marginTop: "10px" }}>
            <input
              type="file"
              accept=".json"
              style={{ display: "none" }}
              onChange={handleImportVault}
              id="import-vault-file"
            />
            <button style={settingsStyles.secondaryButton} onClick={() => document.getElementById("import-vault-file").click()}>
              Import Vault
            </button>
          </label>
        </div>
      )}

      {selectedSetting === "Delete Account" && (
        <div style={{ ...settingsStyles.card, ...settingsStyles.dangerCard }}>
          <h4 style={settingsStyles.dangerText}>Delete Account</h4>
          <p>This action is irreversible.</p>
          <button style={settingsStyles.dangerButton} onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}
