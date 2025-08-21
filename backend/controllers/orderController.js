const Order = require('../models/Order');
const Product = require('../models/Product');

// 🛒 Create Order (Buyer)
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

  // DEMO: Allow empty items array

    let totalAmount = 0;
    const populatedItems = await Promise.all(items.map(async item => {
      const product = await Product.findById(item.product);
      if (!product || product.inventory < item.quantity) {
        throw new Error(`Product ${item.product} not available or insufficient quantity`);
      }
      // Decrease inventory
      product.inventory -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
      return {
        product: product._id,
        seller: product.seller,
        quantity: item.quantity,
        price: product.price
      };
    }));

    const order = new Order({
      buyer: req.user ? req.user._id : undefined,
      items: populatedItems,
      totalAmount,
      shippingAddress,
      orderStatus: 'pending',
      paymentStatus: 'unpaid'
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ message: err.message || 'Server Error' });
  }
};

// 📜 Get all orders for Buyer
exports.getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('items.product')
      .populate('items.seller', 'businessName firstName lastName');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Unable to fetch orders' });
  }
};

// 📜 Get all orders for Seller
exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.seller": req.user._id })
      .populate('buyer', 'firstName lastName email')
      .populate('items.product', 'name price');
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Unable to fetch seller orders' });
  }
};

// 🔍 View specific order (Buyer/Seller involved)
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'firstName lastName email')
      .populate('items.product items.seller', 'name businessName firstName lastName');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (
      req.user.role === 'buyer' && order.buyer.toString() !== req.user._id.toString() ||
      req.user.role === 'seller' && !order.items.some(item => item.seller.toString() === req.user._id.toString())
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Unable to fetch order details' });
  }
};

// 🚚 Update Order Status (Seller Only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!order.items.some(item => item.seller.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Forbidden: Not your order' });
    }

    order.orderStatus = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 💳 Mark Order as Paid (Buyer/Admin)
exports.markOrderPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.user.role === 'buyer' && order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    order.paymentStatus = 'paid';
    await order.save();
    res.json({ message: 'Payment marked as completed', order });
  } catch (err) {
    res.status(500).json({ message: 'Unable to update payment status' });
  }
};

// ❌ Cancel Order (Buyer before shipping)
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Delete the order completely
    await Order.findByIdAndDelete(id);
    
    res.status(200).json({
      message: "Order deleted successfully"
    });
    
  } catch (error) {
    console.error("Delete Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
