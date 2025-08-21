const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Register Buyer
exports.registerBuyer = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // Create new buyer user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: 'buyer'
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Buyer registered successfully',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error('Buyer registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register Seller
exports.registerSeller = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password, phone,
      businessName, businessDescription, businessAddress,
      businessLicense, taxId, bankDetails
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newSeller = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: 'seller',
      businessName,
      businessDescription,
      businessAddress,
      businessLicense,
      taxId,
      bankDetails,
      sellerVerificationStatus: 'pending',
      isSellerActive: false
    });

    await newSeller.save();

    const token = generateToken(newSeller);

    res.status(201).json({
      message: 'Seller registered successfully, pending admin approval',
      token,
      user: {
        id: newSeller._id,
        firstName: newSeller.firstName,
        email: newSeller.email,
        role: newSeller.role,
        sellerVerificationStatus: newSeller.sellerVerificationStatus
      }
    });

    // TODO: Trigger email notification for admin approval if you want
  } catch (err) {
    console.error('Seller registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User (buyer or seller)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
