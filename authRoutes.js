const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const user = req.body;

    // Block public admin registration
    if (user.role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin cannot be registered publicly" });
    }

    // Validate required fields
    if (!user.email || !user.password || !user.phone || !user.role) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      ...user,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "Registration successful. You can now login."
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= LOGIN (ALL ROLES) ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= FORGOT PASSWORD (ACADEMIC DEMO) ================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email"
      });
    }

    // Demo-only response (no real email)
    res.json({
      message:
        "Password reset instructions have been sent to your registered email (demo feature)"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
