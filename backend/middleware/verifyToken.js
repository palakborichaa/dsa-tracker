// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

// IMPORTANT: Use an environment variable for your JWT secret in production!
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_please_change_this_in_production';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err.message);
      return res.status(403).json({ error: 'Token is not valid' });
    }
    // Ensure the payload from JWT sign is consistent: { userId: user._id }
    req.user = decoded; // decoded will contain { userId: '...' }
    next();
  });
}

module.exports = verifyToken;
