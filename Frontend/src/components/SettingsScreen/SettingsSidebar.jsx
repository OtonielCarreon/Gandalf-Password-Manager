import React from "react";
import { FaUser, FaShieldAlt, FaPaintBrush, FaFileExport, FaTrash } from "react-icons/fa";
import settingsStyles from "./settingsStyles";
import NavigationButtons from "../NavigationButton/NavigationButtons";
import logo from "../../images/gandalflogo.jpg";

export default function SettingsSidebar({ selectedSetting, onSelect, isDarkMode }) {
  const settingsOptions = [
    { label: "Account", icon: <FaUser /> },
    { label: "Security", icon: <FaShieldAlt /> },
    { label: "Appearance", icon: <FaPaintBrush /> },
    { label: "Export & Import", icon: <FaFileExport /> },
    { label: "Delete Account", icon: <FaTrash />, danger: true },
  ];

  return (
    <div style={isDarkMode ? settingsStyles.darkSidebar : settingsStyles.sidebar}>
      <img src={logo} alt="Logo" style={settingsStyles.logo} />
      <NavigationButtons />
      <h2 style={settingsStyles.sidebarTitle}>Settings</h2>
      <ul style={settingsStyles.list}>
        {settingsOptions.map((option, idx) => (
          <li
            key={idx}
            style={{
              ...settingsStyles.listItem,
              ...(selectedSetting === option.label ? settingsStyles.listItemActive : {}),
              ...(option.danger ? settingsStyles.dangerItem : {}),
            }}
            onClick={() => onSelect(option.label)}
          >
            <span style={settingsStyles.icon}>{option.icon}</span> 
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
