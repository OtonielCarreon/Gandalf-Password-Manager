const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());

const users = [];

app.get("/", (req, res) => res.send("Welcome!"));

app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User exists" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "Registered" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) return res.status(401).json({ message: "Invalid" });
  res.json({ message: "Success" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
