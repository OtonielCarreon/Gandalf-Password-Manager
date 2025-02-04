import React from "react";
import { FaPlus } from "react-icons/fa";
import logo from "../../images/gandalflogo.jpg"; 
import styles from "./styles";

export default function Sidebar({ passwords, selected, onSelect, onCreateNew }) {
  return (
    <div style={styles.sidebar}>
      <img src={logo} alt="Gandalf Logo" style={styles.logo} />
      <h2 style={styles.sidebarTitle}>My Vault</h2>
      <ul style={styles.list}>
        {passwords.map((entry, idx) => (
          <li
            key={idx}
            style={selected === entry ? styles.listItemActive : styles.listItem}
            onClick={() => onSelect(entry)}
          >
            {entry.site || "Untitled"}
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
