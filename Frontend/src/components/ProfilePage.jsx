import React, { useState } from "react";
import Sidebar from "./PasswordManageScreen/Sidebar"; 
import styles from "./PasswordManageScreen/styles";
import { FaUserCircle, FaCaretDown, FaEdit } from "react-icons/fa";
import CircleImg from "./CircleImg.jsx"; 

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Otoniel Carreon");
  const [email] = useState("ocarreon24@gmail.com");

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <div style={styles.container}>
      {/* Layout: Sidebar + Main Profile */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          passwords={[]} 
          selected={null}
          onSelect={() => {}}
          onCreateNew={() => {}}
        />

        <div style={styles.main}>
          <div style={styles.details}>
            <h2 style={styles.title}>My Profile</h2>

            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <CircleImg />
            </div>

            {/* Name Field */}
            <div style={styles.infoRow}>
              <div style={styles.labelColumn}>Name:</div>
              <div style={styles.valueColumn}>
                {isEditing ? (
                  <input
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  name
                )}
              </div>
            </div>
            {/* Email Field */}
            <div style={styles.infoRow}>
              <div style={styles.labelColumn}>Email:</div>
              <div style={styles.valueColumn}>
                {isEditing ? (
                  <input
                    style={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  email
                )}
              </div>
            </div>
            {/* Button Row */}
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
