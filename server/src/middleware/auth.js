import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'suku_secure_jwt_secret_dev_key_2026';

export function authenticateOwner(req, res, next) {
  // Check cookie or Authorization header
  let token = req.cookies?.suku_token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.owner = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}
