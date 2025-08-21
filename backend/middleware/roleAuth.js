// /middleware/roleAuth.js
module.exports = function(allowedRoles = ['buyer','seller', 'admin']) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role.' });
    }
    next();
  };
};
