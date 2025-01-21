import React, { useState } from "react";


const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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
        <h1 style={styles.title}>Gandalf Password Manager</h1>
        <h2 style={styles.subtitle}>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
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

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "800px",
    backgroundColor:"#e0f7fa",
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
