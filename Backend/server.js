const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());

const users = [];

app.get("/", (req, res) => res.send("Welcome to Gandalf Password Manager!"));

//Route for user registration
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User exists" });
    //Check if the email already exists
  }
  users.push({ email, password });
  //Add new user
  res.status(201).json({ message: "Registered" });
});

//Route for user login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  //Check if user exists with matching credentials
  if (!user) return res.status(401).json({ message: "Invalid" }); //Return error message
  res.json({ message: "Success" }); //Return success message
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
