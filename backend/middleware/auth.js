const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('AUTH ERROR: No authorization token provided');
    return res.status(401).json({ message: 'No authorization token provided' });
  }

  const token = authHeader.split(' ')[1]; // get token after 'Bearer'
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      console.error('AUTH ERROR: Token decoded but no user id found', decoded);
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      console.error('AUTH ERROR: User not found for id', decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('AUTH ERROR: Invalid or expired token', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
