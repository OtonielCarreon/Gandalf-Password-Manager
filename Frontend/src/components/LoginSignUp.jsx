import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect users after login
import logo from "../images/gandalflogo.jpg"; 

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // React Router for redirection

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  

  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiEndpoint = isLogin 
      ? "http://localhost:5001/login" 
      : "http://localhost:5001/signup";

    const payload = isLogin 
      ? { email: formData.email, password: formData.password } 
      : { 
          first_name: formData.first_name,  
          last_name: formData.last_name, 
          email: formData.email, 
          username: formData.email.split("@")[0], 
          password: formData.password
        };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); 
        if (isLogin) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/passwords"); 
        }
      } else {
        alert("Error: " + data.error); 
      }
    } catch (error) {
      alert("Request failed: " + error.message);
    }
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" }); // Reset input fields
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="Gandalf Logo" style={styles.logo} />
        <h1 style={styles.title}>Gandalf Password Manager</h1>
        <h2 style={styles.subtitle}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && ( // Show name field only during signup
           <>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p style={styles.toggle} onClick={toggleMode}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#e0f7fa",
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
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: "20px",
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
