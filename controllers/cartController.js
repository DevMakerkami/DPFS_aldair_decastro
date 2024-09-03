const Product = require('../models/Product');

let cart = [];

exports.getCart = (req, res) => {
  res.render('products/cart', { cart });
};

exports.addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const product = Product.getById(productId);
  if (product) {
    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.push({ product, quantity: parseInt(quantity) });
    }
    res.json({ success: true, cartSize: cart.length });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

exports.updateCart = (req, res) => {
  const { productId, quantity } = req.body;
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = parseInt(quantity);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'Product not found in cart' });
  }
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.body;
  cart = cart.filter(item => item.product.id !== productId);
  res.json({ success: true, cartSize: cart.length });
};