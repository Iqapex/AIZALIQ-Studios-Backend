const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// 🔹 Dummy admin credentials
const ADMIN_EMAIL = "admin@site.com";
const ADMIN_PASSWORD = "admin123";

// 🔹 Dummy user storage (in memory)
let users = [];

// ✅ User registration route
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { name, email, password };
  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully" });
});

// ✅ User login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email, role: "user" },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );

  return res.json({ token, message: "Login successful" });
});

// ✅ Admin login route
router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );
    return res.json({ token, message: "Admin login successful" });
  }

  return res.status(401).json({ message: "Invalid admin credentials" });
});

module.exports = router;
