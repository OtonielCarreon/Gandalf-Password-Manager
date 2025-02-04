import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainPanel from "./MainPanel";
import styles from "./styles";

const initialPasswords = [
  { site: "Bestbuy", username: "Testingaccount", password: "password123", website: "bestbuy.com" },
  { site: "Amazon", username: "Testingaccount", password: "amazonpass", website: "amazon.com" },
  { site: "Netflix", username: "Testingaccount", password: "netflixpass", website: "netflix.com" },
];

export default function PasswordManager() {
  const [passwords, setPasswords] = useState(initialPasswords);
  const [selected, setSelected] = useState(passwords[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFieldChange = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateNew = () => {
    const newEntry = { site: "", username: "", password: "", website: "" };
    setPasswords((prev) => [...prev, newEntry]);
    setSelected(newEntry);
    setIsEditing(true);
  };

  const handleDelete = () => {
    setPasswords((prev) => prev.filter((entry) => entry !== selected));
    setSelected(null);
    setIsEditing(false);
    setShowPassword(false);
  };

  return (
    <div style={styles.container}>
      <Sidebar passwords={passwords} selected={selected} onSelect={setSelected} onCreateNew={handleCreateNew} />
      <MainPanel
        selected={selected}
        isEditing={isEditing}
        showPassword={showPassword}
        onFieldChange={handleFieldChange}
        setIsEditing={setIsEditing}
        setShowPassword={setShowPassword}
        onSave={() => setIsEditing(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
