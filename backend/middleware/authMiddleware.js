import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware function to validate JWT tokens
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};


export default authMiddleware;
