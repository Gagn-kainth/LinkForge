const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function getTokenFromHeader(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length);
}
function requireAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res
      .status(401)
      .json({ error: "Session expired, please log in again" });
  }
}

function optionalAuth(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return next();

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email };
  } catch {}
  next();
}

module.exports = { requireAuth, optionalAuth };
