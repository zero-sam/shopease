const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
}, { _id: false });

const bankDetailsSchema = new Schema({
  accountNumber: String,
  routingNumber: String,
  accountHolderName: String,
}, { _id: false });

// Rename this to userSchema (fix typo)
const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name required'],
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name required'],
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    lowercase: true,
    maxlength: 50
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'Phone number required'],
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  },

  // Buyer-specific fields
  shippingAddresses: [addressSchema], // Array of addresses
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  // Seller-specific fields
  businessName: {
    type: String,
    trim: true
  },
  businessDescription: {
    type: String
  },
  businessAddress: addressSchema,
  businessLicense: {
    type: String,
    trim: true
  },
  taxId: {
    type: String,
    trim: true
  },
  bankDetails: bankDetailsSchema,

  sellerVerificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  commission: {
    type: Number,
    default: 0 // percentage commission on sales
  },
  totalSales: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  isSellerActive: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
