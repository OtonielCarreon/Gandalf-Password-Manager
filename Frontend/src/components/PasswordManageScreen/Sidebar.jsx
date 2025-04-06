import React from "react";
import { FaPlus, FaLock } from "react-icons/fa";
import logo from "../../images/gandalflogo.jpg";
import NavigationButtons from "../NavigationButton/NavigationButtons.jsx";
import styles from "./styles";

export default function Sidebar({ passwords, selected, onSelect, onCreateNew }) {
  return (
    <div style={styles.sidebar}>
      <img src={logo} alt="Gandalf Logo" style={styles.logo} />
      <NavigationButtons />
      <h2 style={styles.sidebarTitle}>My Vault</h2>
      <ul style={styles.list}>
        {passwords.map((entry, idx) => (
          <li
            key={idx}
            style={{
              ...styles.listItem,
              ...(selected === entry ? styles.listItemActive : {}),
            }}
            onClick={() => onSelect(entry)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1e88e5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = selected === entry ? "#0d47a1" : "#1976d2")}
          >
            <FaLock />
            <span>{entry.site || "Untitled"}</span>
          </li>
        ))}
      </ul>
      <button style={styles.newButton} onClick={onCreateNew}>
        <FaPlus style={{ marginRight: 5 }} />
        Create New
      </button>
    </div>
  );
}