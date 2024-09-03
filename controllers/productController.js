const Product = require('../models/Product');

exports.getAllProducts = (req, res) => {
  const products = Product.getAll();
  res.render('products/list', { products, isAdmin: req.session.user && req.session.user.category === 'admin' });
};

exports.getProductDetail = (req, res) => {
  const product = Product.getById(req.params.id);
  if (product) {
    res.render('products/detail', { product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

exports.getCreateProductForm = (req, res) => {
  res.render('products/create');
};

exports.createProduct = (req, res) => {
  const newProduct = Product.create(req.body);
  res.redirect(`/products/${newProduct.id}`);
};

exports.getEditProductForm = (req, res) => {
  const product = Product.getById(req.params.id);
  if (product) {
    res.render('products/edit', { product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

exports.updateProduct = (req, res) => {
  const updatedProduct = Product.update(req.params.id, req.body);
  if (updatedProduct) {
    res.redirect(`/products/${updatedProduct.id}`);
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

exports.deleteProduct = (req, res) => {
  const deleted = Product.delete(req.params.id);
  if (deleted) {
    res.redirect('/products');
  } else {
    res.status(404).send('Producto no encontrado');
  }
};