const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // if admin login:
  if (email === "admin@site.com" && password === "admin123") {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.json({ token });
  }

  // normal user login

};
