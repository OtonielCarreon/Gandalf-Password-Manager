import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainPanel from "./MainPanel";
import { FaUserCircle, FaCaretDown, FaSearch } from "react-icons/fa";
import styles from "./styles";

const initialPasswords = [
  { site: "Bestbuy", username: "Testingaccount", password: "password123", website: "bestbuy.com" },
  { site: "Amazon", username: "Testingaccount", password: "amazonpass", website: "amazon.com" },
  { site: "Netflix", username: "Testingaccount", password: "netflixpass", website: "netflix.com" },
];

export default function PasswordManager() {
  const [passwords, setPasswords] = useState(initialPasswords);
  const [filteredPasswords, setFilteredPasswords] = useState(initialPasswords);
  const [selected, setSelected] = useState(passwords[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handles changes in input fields
  const handleFieldChange = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  // Creates a new password entry
  const handleCreateNew = () => {
    const newEntry = { site: "", username: "", password: "", website: "" };
    setPasswords((prev) => [...prev, newEntry]);
    setFilteredPasswords((prev) => [...prev, newEntry]);
    setSelected(newEntry);
    setIsEditing(true);
  };

  // Deletes selected password entry
  const handleDelete = () => {
    const updatedPasswords = passwords.filter((entry) => entry !== selected);
    setPasswords(updatedPasswords);
    setFilteredPasswords(updatedPasswords);
    setSelected(null);
    setIsEditing(false);
    setShowPassword(false);
  };

  // Filter passwords when searching
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = passwords.filter((entry) =>
      entry.site.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPasswords(filtered);
  };

  return (
    <div style={styles.container}>
      {/* Top Bar with Search & Email Dropdown */}
      <div style={styles.topBar}>
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search passwords..."
            style={styles.searchBar}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Account Dropdown on the Right */}
        <div style={styles.accountContainer}>
          <FaUserCircle size={20} />
          <span style={styles.emailText}>user@example.com</span>
          <FaCaretDown style={styles.dropdownIcon} />
        </div>
      </div>

      {/* Sidebar & Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          passwords={filteredPasswords}
          selected={selected}
          onSelect={setSelected}
          onCreateNew={handleCreateNew}
        />
        <MainPanel
          selected={selected}
          isEditing={isEditing}
          showPassword={showPassword}
          onFieldChange={handleFieldChange}
          setIsEditing={setIsEditing}
          setShowPassword={setShowPassword}
          onSave={() => setIsEditing(false)}
          onDelete={handleDelete}
          passwords={filteredPasswords}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
