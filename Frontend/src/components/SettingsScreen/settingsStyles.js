const settingsStyles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#e0f7fa",
    fontFamily: "Arial, sans-serif",
  },

  darkContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#121212",
    fontFamily: "Arial, sans-serif",
    color: "#ffffff",
  },

  sidebar: {
    width: "300px",
    height: "100vh",
    background: "#1565c0",
    padding: "20px",
    // boxSizing: "border-box",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRight: "3px solid #0d47a1",
  },

  darkSidebar: {
    width: "300px",
    height: "100vh",
    background: "#1e1e1e",
    padding: "20px",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    borderRight: "3px solid #333",
  },

  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "15px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flexGrow: 1,
    overflowY: "auto",
  },

  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "12px 15px",
    cursor: "pointer",
    borderRadius: "8px",
    marginBottom: "6px",
    fontSize: "16px",
    background: "#1976d2",
    color: "#ffffff",
    transition: "0.3s",
    fontWeight: "500",
    border: "2px solid transparent",
    gap: "10px",
  },

  listItemActive: {
    background: "#0d47a1",
    color: "#ffffff",
    fontWeight: "bold",
    border: "2px solid #ffffff",
  },

  dangerItem: {
    color: "#f87171",
  },

  mainPanel: {
    flex: 1,
    padding: "40px",
  },

  darkMainPanel: {
    flex: 1,
    padding: "40px",
    background: "#181818",
    color: "#ffffff",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    marginBottom: "20px",
  },

  darkCard: {
    background: "#252525",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "10px",
  },

  input: {
    width: "60px",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },

  actionButton: {
    backgroundColor: "#1e88e5",
    color: "#fff",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },

  successButton: {
    backgroundColor: "#1e88e5",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    border: "none", 
    outline: "none",
  },

  secondaryButton: {
    backgroundColor: "#6b7280",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
    border: "none", 
    outline: "none",
  },

  dangerButton: {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "10px",
    borderRadius: "6px",
  },

  dangerText: {
    color: "#dc2626",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  logo: {
    width: "175px",
    height: "175px",
    marginBottom: "20px",
    alignSelf: "center",
  },
};
export default settingsStyles;