import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainPanel from "./MainPanel";
import { FaSearch } from "react-icons/fa";
import styles from "./styles";

export default function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPasswordsFromDB = async () => {
    try {
      const response = await fetch("http://localhost:5001/passwords");
      const data = await response.json();
      setPasswords(data);
      setFilteredPasswords(data);
      setSelected(data[0] || null);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  const savePasswordToDB = async (entry) => {
    try {
      const payload = {
        site: entry.site,
        username: entry.username,
        password: selected.password_plaintext || selected.password, 
        website: entry.website
      };

      const response = await fetch("http://localhost:5001/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Password saved to DB!");
      } else {
        console.error("Error from server:", data.error);
      }
    } catch (error) {
      console.error("Error saving password to DB:", error);
    }
  };

  const deletePasswordFromDB = async (id) => {
    try {
      await fetch(`http://localhost:5001/passwords/${id}`, {
        method: "DELETE"
      });
      console.log("Password deleted from DB!");
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  useEffect(() => {
    fetchPasswordsFromDB();
  }, []);

  const handleFieldChange = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateNew = () => {
    const newEntry = { site: "", username: "", password_plaintext: "", website: "" };
    setPasswords((prev) => [...prev, newEntry]);
    setFilteredPasswords((prev) => [...prev, newEntry]);
    setSelected(newEntry);
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!selected) return;

    if (selected.password_id) {
      await deletePasswordFromDB(selected.password_id);
    }

    const updatedPasswords = passwords.filter((entry) => entry !== selected);
    setPasswords(updatedPasswords);
    setFilteredPasswords(updatedPasswords);
    setSelected(null);
    setIsEditing(false);
    setShowPassword(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = passwords.filter((entry) =>
      (entry.site || "").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPasswords(filtered);
  };

  const handleSave = async () => {
    if (!selected) return;

    if (!selected.site || !selected.username || !(selected.password_plaintext || selected.password) || !selected.website) {
      alert("Please fill in all fields before saving.");
      return;
    }

    const payload = {
      site: selected.site,
      username: selected.username,
      password: selected.password_plaintext,
      website: selected.website,
    };

    if (selected.password_id) {
      // UPDATE existing password
      await fetch(`http://localhost:5001/passwords/${selected.password_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // INSERT new password
      await savePasswordToDB(payload);
    }

    await fetchPasswordsFromDB(); // Refresh sidebar
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <div name="topbar" style={styles.topBar}>
        <div name="searchcontainer" style={styles.searchContainer}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search passwords..."
            style={styles.searchBar}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div name="sidebar-and-content" style={styles.sidebarAndContent}>
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
          onSave={handleSave}
          onDelete={handleDelete}
          passwords={filteredPasswords}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}
