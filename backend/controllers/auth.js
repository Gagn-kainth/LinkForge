const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = "30d";

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleSignup(req, res) {
  const { email, password } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email is required" });
  }
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res
      .status(409)
      .json({ error: "An account with that email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email: email.toLowerCase(), passwordHash });

  const token = signToken(user);
  return res
    .status(201)
    .json({ token, user: { id: user._id, email: user.email } });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  const token = signToken(user);
  return res.json({ token, user: { id: user._id, email: user.email } });
}

async function handleMe(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(401).json({ error: "Not logged in" });
  return res.json({ user: { id: user._id, email: user.email } });
}

module.exports = { handleSignup, handleLogin, handleMe };
