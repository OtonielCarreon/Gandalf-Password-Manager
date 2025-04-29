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

// Signup route 
app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists with that email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${first_name} ${last_name}`;

    await pool.query(
      "INSERT INTO users (username, email, master_password_hash, created_at) VALUES ($1, $2, $3, NOW())",
      [username, email, hashedPassword]
    );

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Server error during signup." });
  }
});



// Login route 
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.master_password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    res.json({ message: "Login successful!", user });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error during login." });
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

app.put("/passwords/:id", async (req, res) => {
  const { id } = req.params;
  const { site, username, password, website } = req.body;

  if (!site || !username || !password || !website) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE passwords 
       SET site = $1, username = $2, website_url = $3, encrypted_password = $4, password_plaintext = $5
       WHERE password_id = $6`,
      [site, username, website, encryptedPassword, password, id]
    );

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ error: "Database update error" });
  }
});

app.put("/me", async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required." });
  }

  try {
    await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE user_id = $3",
      [username, email, 1] // Hardcoded user_id = 1 for now
    );
    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Database update error" });
  }
});


app.get("/me", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username, email FROM users WHERE user_id = $1",
      [1] // hardcoded user_id = 1
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Database fetch error" });
  }
});

app.put("/change-password", async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
      "UPDATE users SET master_password_hash = $1 WHERE user_id = $2",
      [hashedPassword, 1] 
    );

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ error: "Database error while updating password." });
  }
});

app.delete("/delete-account", async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE user_id = $1", [1]); 
    res.json({ message: "Account deleted successfully!" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Database delete error" });
  }
});

// Export vault
app.get("/export-vault", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM passwords WHERE user_id = $1", [1]);
    const passwords = result.rows;
    res.setHeader('Content-Disposition', 'attachment; filename="vault_backup.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(passwords, null, 2));
  } catch (err) {
    console.error("Error exporting vault:", err);
    res.status(500).json({ error: "Vault export error" });
  }
});


// Import vault
app.post("/import-vault", async (req, res) => {
  try {
    const { vault } = req.body;
    if (!Array.isArray(vault)) {
      return res.status(400).json({ error: "Invalid vault format." });
    }

    for (const entry of vault) {
      await pool.query(
        "INSERT INTO passwords (user_id, site, website_url, username, encrypted_password, password_plaintext, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())",
        [1, entry.site, entry.website_url, entry.username, entry.encrypted_password, entry.password_plaintext]
      );
    }

    res.json({ message: "Vault imported successfully!" });
  } catch (err) {
    console.error("Error importing vault:", err);
    res.status(500).json({ error: "Vault import error" });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
