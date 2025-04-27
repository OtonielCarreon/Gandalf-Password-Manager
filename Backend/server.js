require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch(err => {
    console.error("Database connection error:", err);
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

app.post("/passwords", async (req, res) => {
  const { site, username, password, website } = req.body;

  if (!site || !username || !password || !website) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO passwords (user_id, site, website_url, username, encrypted_password, password_plaintext, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
      [1, site, website, username, encryptedPassword, password]
    );

    res.json({ message: "Password saved successfully!" });
  } catch (err) {
    console.error("Error saving password:", err);
    res.status(500).json({ error: "Database error" });
  }
});


app.get("/passwords", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT password_id, site, website_url AS website, username, encrypted_password, password_plaintext FROM passwords"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching passwords:", err);
    res.status(500).json({ error: "Database fetch error" });
  }
});

app.delete("/passwords/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM passwords WHERE password_id = $1", [id]);
    res.json({ message: "Password deleted successfully!" });
  } catch (err) {
    console.error("Error deleting password:", err);
    res.status(500).json({ error: "Database delete error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
