const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const productController = require('../controllers/productController');

const Product = require('../models/Product');
// ================================
// SELLER ROUTES
// ================================

// Create new product (Seller only)
router.post('/', auth, roleAuth(['seller']), productController.createProduct);

// Get all products for the logged-in seller
// IMPORTANT: must be before '/:id' route
router.get('/my-products', auth, roleAuth(['seller']), productController.getSellerProducts);

// Update product (Seller only, must own product)
router.put('/:id', auth, roleAuth(['seller']), productController.updateProduct);

// Delete product (Seller only, must own product)
router.delete('/:id', auth, roleAuth(['seller']), productController.deleteProduct);


// ================================
// PUBLIC / BUYER ROUTES
// ================================

// Public product listing (open to everyone - no auth)
// GET all public products (no auth required)
router.get('/public', async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name email'); 
    res.json(products);
  } catch (error) {
    console.error('Error in /products/public:', error); // Add this line
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID (public too — remove auth if you want guests to view)
router.get('/:id', productController.getProductById);

module.exports = router;
