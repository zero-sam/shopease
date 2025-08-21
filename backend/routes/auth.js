const express = require('express');
const {registerBuyer, registerSeller, loginUser} = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register/buyer', registerBuyer);
router.post('/register/seller', registerSeller);
router.post('/login', loginUser);
router.get('/me', auth, (req, res) => {
  // req.user is set by auth middleware after token verification
  // Exclude sensitive fields (like password)
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  // Safely omit password and any sensitive data
  const { password, ...safeUser } = req.user.toObject();
  res.json({ user: safeUser });
});

module.exports = router;