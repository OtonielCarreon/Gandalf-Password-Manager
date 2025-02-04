import React from "react";
import { FaEye, FaEyeSlash, FaCopy, FaPencilAlt, FaTrash } from "react-icons/fa";
import styles from "./styles";
import InfoRow from "./InfoRow";

export default function MainPanel({ selected, isEditing, showPassword, onFieldChange, setIsEditing, setShowPassword, onSave, onDelete }) {
  if (!selected) {
    return (
      <div style={styles.main}>
        <h1 style={styles.title}>Manage Passwords</h1>
        <p>Please select a vault item or create a new one.</p>
      </div>
    );
  }

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Manage Passwords</h1>
      <div style={styles.details}>
        <InfoRow label="Name">
          {isEditing ? (
            <input style={styles.input} type="text" value={selected.site} onChange={(e) => onFieldChange("site", e.target.value)} />
          ) : (
            selected.site || "Untitled"
          )}
        </InfoRow>

        <InfoRow label="Username" icon={!isEditing && <FaCopy style={styles.icon} onClick={() => navigator.clipboard.writeText(selected.username)} />}>
          {isEditing ? (
            <input style={styles.input} type="text" value={selected.username} onChange={(e) => onFieldChange("username", e.target.value)} />
          ) : (
            selected.username
          )}
        </InfoRow>

        <InfoRow label="Password" icon={!isEditing && (showPassword ? <FaEyeSlash style={styles.icon} onClick={() => setShowPassword(false)} /> : <FaEye style={styles.icon} onClick={() => setShowPassword(true)} />)}>
          {isEditing ? (
            <input style={styles.input} type="text" value={selected.password} onChange={(e) => onFieldChange("password", e.target.value)} />
          ) : showPassword ? (
            selected.password
          ) : (
            "••••••••"
          )}
        </InfoRow>

        <InfoRow label="Website">
          {isEditing ? (
            <input style={styles.input} type="text" value={selected.website} onChange={(e) => onFieldChange("website", e.target.value)} />
          ) : (
            selected.website && (
              <a style={styles.link} href={`https://${selected.website}`} target="_blank" rel="noopener noreferrer">
                {selected.website}
              </a>
            )
          )}
        </InfoRow>

        <div style={{ marginTop: "10px" }}>
          {isEditing ? (
            <button style={styles.actionButton} onClick={onSave}>
              <FaPencilAlt style={{ marginRight: 5 }} />
              Save
            </button>
          ) : (
            <button style={styles.actionButton} onClick={() => setIsEditing(true)}>
              <FaPencilAlt style={{ marginRight: 5 }} />
              Edit
            </button>
          )}
          <button style={styles.deleteButton} onClick={onDelete}>
            <FaTrash style={{ marginRight: 5 }} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
