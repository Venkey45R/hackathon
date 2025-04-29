const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with "Bearer"
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Get token from "Bearer <token>"

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
      req.user = decoded; // attach user data to request object
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(403).json({ message: 'No token provided' });
  }
};

module.exports = verifyToken;
