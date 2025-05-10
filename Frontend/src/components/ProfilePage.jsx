import React, { useState, useEffect } from "react";
import Sidebar from "./PasswordManageScreen/Sidebar";
import styles from "./PasswordManageScreen/styles";
import { FaEdit } from "react-icons/fa";
import CircleImg from "./CircleImg.jsx";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false); 

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5001/me");
      const data = await response.json();
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5001/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        setSaveSuccess(true); 
        setIsEditing(false);
        fetchUser(); // reload new data
        setTimeout(() => setSaveSuccess(false), 1000); 
      } else {
        const data = await response.json();
        alert("Error updating profile: " + data.error);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div style={styles.container}>

      {saveSuccess && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "14px",
          zIndex: 1000,
        }}>
          Profile updated!
        </div>
      )}

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar passwords={[]} selected={null} onSelect={() => {}} onCreateNew={() => {}} />
        
        <div style={styles.main}>
          <div style={styles.details}>
            <h2 style={styles.title}>My Profile</h2>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <CircleImg />
            </div>

            {/* Name */}
            <div style={styles.infoRow}>
              <div style={styles.labelColumn}>Name:</div>
              <div style={styles.valueColumn}>
                {isEditing ? (
                  <input
                    style={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  username
                )}
              </div>
            </div>

            {/* Email */}
            <div style={styles.infoRow}>
              <div style={styles.labelColumn}>Email:</div>
              <div style={styles.valueColumn}>
                {isEditing ? (
                  <input
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  email
                )}
              </div>
            </div>

            {/* Save / Edit Button */}
            <div style={styles.buttonContainer}>
              <button
                style={styles.actionButton}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                <FaEdit style={{ marginRight: 6 }} />
                {isEditing ? "Save" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
