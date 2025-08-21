const Product = require('../models/Product'); // ✅ Import the model

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images, inventory } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      images,
      inventory,
      seller: req.user._id
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ message: error.message || 'Server error while creating product' });
  }
};

// Public / buyer & seller product list
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('seller', 'businessName firstName lastName');

    res.json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// Only seller's products
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id })
      .populate('seller', 'businessName firstName lastName');
    res.json(products);
  } catch (error) {
    console.error("Get Seller Products Error:", error);
    res.status(500).json({ message: 'Server error while fetching your products' });
  }
};

// One product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'businessName firstName lastName');

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ product });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    

    const { name, description, price, category, images, inventory, isActive } = req.body;
    if (typeof isActive === "string") {
    product.isActive = isActive === "on" || isActive === "true";
  } else {
    product.isActive = !!isActive;
  }
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;
    if (images !== undefined) product.images = images;
    if (inventory !== undefined) product.inventory = inventory;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.log(error.message);
    console.error("Update Product Error:", error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};
