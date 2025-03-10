require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
app.use(express.json()); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), 
  ssl: { rejectUnauthorized: false } 
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL on Render successfully!"))
  .catch(err => {
    console.error(" Database connection error:", err);
    process.exit(1); 
  });


app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err });
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: "Email already exists or invalid input" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = userResult.rows[0];
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
