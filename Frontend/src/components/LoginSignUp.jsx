import React, { useState } from "react";
import axios from "axios";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)} 
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} 
          required
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginSignUp;
