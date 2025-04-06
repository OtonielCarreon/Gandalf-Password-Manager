const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#e0f7fa",
    fontFamily: "Arial, sans-serif",
  },
  emailText: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  accountContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    background: "#1565c0",
    padding: "8px 12px",
    borderRadius: "20px",
    color: "white",
    //position:"absolute", 
    //left: "5000px",
  },
  dropdownIcon: {
    fontSize: "16px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: "300px",
  },
  topBar: {
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#e0f7fa",
    borderBottom: "1px solid #ddd",
    width: "100%",
    marginLeft: "100px",
  },
  sidebar: {
    width: "300px",
    height: "100vh",
    background: "#1565c0",
    padding: "20px",
    boxSizing: "border-box",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRight: "3px solid #0d47a1",
    position: "fixed", 
    left: 0,
    top: 0,
  },
  logo: {
    width: "175px",
    height: "175px",
    marginBottom: "20px",
    alignSelf: "center",
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
  listItemHover: {
    background: "#1e88e5",
  },
  newButton: {
    padding: "12px",
    backgroundColor: "#1e88e5",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    marginTop: "10px",
    transition: "0.3s",
    textAlign: "center",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", 
    // padding: "20px",
    // marginTop: "0px", 
    // marginLeft: "200px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: "20px",
  },
  details: {
    width: "100%",
    maxWidth: "500px",
    padding: "25px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    position: "relative",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #ddd",
  },
  labelColumn: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    flexBasis: "30%",
  },
  valueColumn: {
    flexGrow: 1,
    fontSize: "16px",
    color: "#555",
  },
  iconColumn: {
    marginLeft: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  actionButton: {
    padding: "10px 16px",
    backgroundColor: "#1e88e5",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: "10px 16px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  link: {
    color: "#1e88e5",
    textDecoration: "none",
    fontWeight: "bold",
  },
  
  searchContainer: {
   display: "flex",
   alignItems: "center",
   position: "relative",
   marginBottom: "15px",
   width: "554px", 

  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "40%", 
    margin: "auto", 
  },
  searchBar: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    paddingLeft: "30px",
  },
  
  searchIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#777",
  },
};

export default styles;
