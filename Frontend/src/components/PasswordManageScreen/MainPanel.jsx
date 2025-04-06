import React from "react";
import { FaEye, FaEyeSlash, FaCopy, FaPencilAlt, FaTrash } from "react-icons/fa";
import styles from "./styles";
import InfoRow from "./InfoRow";

export default function MainPanel({
  selected, isEditing, showPassword, onFieldChange, setIsEditing, setShowPassword, onSave, onDelete
}) {
  // Copies text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={styles.main}>
      {!selected ? (
        <p style={{ fontSize: "16px", color: "gray" }}>
          Please select a vault item or create a new one.
        </p>
      ) : (
        <div style={styles.details}>
          <InfoRow label="Name">
            {isEditing ? (
              <input
                style={styles.input}
                type="text"
                value={selected.site}
                onChange={(e) => onFieldChange("site", e.target.value)}
              />
            ) : (
              selected.site || "Untitled"
            )}
          </InfoRow>

          <InfoRow label="Username">
            {isEditing ? (
              <input
                style={styles.input}
                type="text"
                value={selected.username}
                onChange={(e) => onFieldChange("username", e.target.value)}
              />
            ) : (
              <>
                {selected.username}{" "}
                <FaCopy
                  style={styles.iconColumn}
                  title="Copy Username"
                  onClick={() => copyToClipboard(selected.username)}
                />
              </>
            )}
          </InfoRow>

          <InfoRow label="Password">
            {isEditing ? (
              <input
                style={styles.input}
                type="text"
                value={selected.password}
                onChange={(e) => onFieldChange("password", e.target.value)}
              />
            ) : (
              <>
                {showPassword ? selected.password : "••••••••"}{" "}
                <FaCopy
                  style={styles.iconColumn}
                  title="Copy Password"
                  onClick={() => copyToClipboard(selected.password)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    style={styles.iconColumn}
                    title="Hide Password"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    style={styles.iconColumn}
                    title="Show Password"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </>
            )}
          </InfoRow>

          <InfoRow label="Website">
            {isEditing ? (
              <input
                style={styles.input}
                type="text"
                value={selected.website}
                onChange={(e) => onFieldChange("website", e.target.value)}
              />
            ) : (
              <a
                style={styles.link}
                href={`https://${selected.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selected.website}
              </a>
            )}
          </InfoRow>

          <div style={styles.buttonContainer}>
            <button
              style={styles.actionButton}
              onClick={isEditing ? onSave : () => setIsEditing(true)}
            >
              <FaPencilAlt /> {isEditing ? "Save" : "Edit"}
            </button>
            <button style={styles.deleteButton} onClick={onDelete}>
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
