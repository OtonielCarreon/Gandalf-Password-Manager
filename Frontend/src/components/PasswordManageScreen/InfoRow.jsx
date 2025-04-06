import React from "react";
import styles from "./styles"; 

export default function InfoRow({ label, children, icon }) {
  return (
    <div style={styles.infoRow}>
      <div style={styles.labelColumn}>
        <strong>{label}:</strong>
      </div>
      <div style={styles.valueColumn}>{children}</div>
      {icon && <div style={styles.iconColumn}>{icon}</div>}
    </div>
  );
}
