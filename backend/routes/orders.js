const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const orderController = require('../controllers/orderController');

// Buyer routes
router.post('/', auth, roleAuth(['buyer']), orderController.createOrder);
router.get('/', auth, roleAuth(['buyer']), orderController.getBuyerOrders);
router.put('/:id/pay', auth, roleAuth(['buyer', 'admin','seller']), orderController.markOrderPaid);
router.put('/:id/cancel', auth, roleAuth(['buyer']), orderController.cancelOrder);

// Seller routes
router.get('/seller', auth, roleAuth(['seller']), orderController.getSellerOrders);
router.put('/:id/status', auth, roleAuth(['seller']), orderController.updateOrderStatus);

// Shared route
router.get('/:id', auth, roleAuth(['buyer', 'seller']), orderController.getOrderDetails);

module.exports = router;
