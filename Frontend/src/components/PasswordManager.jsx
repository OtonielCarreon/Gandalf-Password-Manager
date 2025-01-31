import React, { useState } from "react";
import logo from "../images/gandalflogo.jpg"; 
import { FaEye, FaEyeSlash, FaCopy, FaExternalLinkAlt, FaPlus, FaEdit } from "react-icons/fa";

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([
    { site: "Bestbuy", username: "Testingaccount", password: "password123", website: "bestbuy.com" },
    { site: "Amazon", username: "Testingaccount", password: "amazonpass", website: "amazon.com" },
    { site: "Netflix", username: "Testingaccount", password: "netflixpass", website: "netflix.com" },
  ]);
  const [selected, setSelected] = useState(passwords[0]);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <img src={logo} alt="Gandalf Logo" style={styles.logo} />
        <h2 style={styles.sidebarTitle}>My Vault</h2>
        <ul style={styles.list}>
          {passwords.map((entry, index) => (
            <li
              key={index}
              style={selected.site === entry.site ? styles.listItemActive : styles.listItem}
              onClick={() => setSelected(entry)}
            >
              {entry.site}
            </li>
          ))}
        </ul>
        <button style={styles.addButton}><FaPlus /> Add New</button>
      </div>

      <div style={styles.main}>
        <h1 style={styles.title}>Password Manager</h1>
        {selected && (
          <div style={styles.details}>
            <div style={styles.infoBox}>
              <strong>Name:</strong> {selected.site}
              <FaEdit style={styles.icon} />
            </div>
            <div style={styles.infoBox}>
              <strong>Username:</strong> {selected.username} <FaCopy style={styles.icon} onClick={() => navigator.clipboard.writeText(selected.username)} />
            </div>
            <div style={styles.infoBox}>
              <strong>Password:</strong> {showPassword ? selected.password : "••••••••"} 
              {showPassword ? (
                <FaEyeSlash style={styles.icon} onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye style={styles.icon} onClick={() => setShowPassword(true)} />
              )}
            </div>
            <div style={styles.infoBox}>
              <strong>Website:</strong> <a href={`https://${selected.website}`} target="_blank" rel="noopener noreferrer" style={styles.link}>{selected.website} <FaExternalLinkAlt /></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#e0f7fa",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  sidebar: {
    width: "250px",
    background: "#add8e6",
    padding: "20px",
    textAlign: "left",
    height: "100vh",
  },
  logo: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  sidebarTitle: {
    fontSize: "22px",
    color: "white",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid white",
    color: "black",
  },
  listItemActive: {
    padding: "10px",
    cursor: "pointer",
    background: "#007bff",
    color: "white",
  },
  main: {
    flex: 1,
    padding: "20px",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    color: "black",
  },
  details: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  infoBox: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  addButton: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  icon: {
    cursor: "pointer",
    marginLeft: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
  },
};

export default PasswordManager;
