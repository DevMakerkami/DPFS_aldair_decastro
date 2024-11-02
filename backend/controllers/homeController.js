const Product = require('../models/Product');

exports.getHomePage = (req, res) => {
  const products = Product.getAll();
  res.render('index', { products });
};