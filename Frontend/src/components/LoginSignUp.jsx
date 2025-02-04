import React, { useState } from "react";
import logo from "../images/gandalflogo.jpg"; //import logo image

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  // State to toggle between Login and Sign Up modes

  const [formData, setFormData] = useState({
    // State to manage form data for name, email, and password
    name: "",
    email: "",
    password: "",
  });

  // Handle form input changes and update formData state
  const handleChange = (event) => {
    const { name, value } = event.target; // Extract name and value from input
    setFormData({ ...formData, [name]: value }); // Update the corresponding field in state
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`${isLogin ? "Logging in" : "Registering"} with ${formData.email}`);
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @font-face {
            font-family: 'Virust';
            src: url('./fonts/VIRUST.ttf') format('truetype');
          }
        `}
      </style>
      <div style={styles.card}>
        <img src={logo} alt="Gandalf Logo" style={styles.logo} />
        <h1 style={styles.title}>Gandalf Password Manager</h1>
        <h2 style={styles.subtitle}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && ( //Form for login signup
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <input //email input 
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input //password input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button // submit button
            type="submit" style={styles.button}> 
            {isLogin ? "Login" : "Sign Up"} 
          </button>
        </form>
        <p style={styles.toggle} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};
//styles for the components
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor:"#e0f7fa",
  },
  logo: {
    width: "100px", 
    height: "100px",
    marginBottom: "20px", 
  },
  card: {
    background: "#add8e6",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "300px",
  },
  title: {
    fontFamily: "Virust, sans-serif",
    fontSize: "32px",
    color: "white",
  },
  subtitle: {
    fontFamily: "Virust, sans-serif",
    fontSize: "24px",
    color: "black",
    marginBottom: "20px",
  },  
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "10px",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LoginSignUp;