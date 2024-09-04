const Product = require('../models/Product');

exports.getAllProducts = (req, res) => {
  const products = Product.getAll();
  res.render('products/list', { products });
};

exports.getProductDetail = (req, res) => {
  const product = Product.getById(req.params.id);
  if (product) {
    res.render('products/detail', { product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

exports.getAdminProductList = (req, res) => {
  const products = Product.getAll();
  res.render('products/admin/list', { products });
};

exports.getCreateProductForm = (req, res) => {
  res.render('products/admin/create');
};

exports.createProduct = (req, res) => {
  const newProduct = Product.create(req.body);
  res.redirect('/products/admin');
};

exports.getEditProductForm = (req, res) => {
  const product = Product.getById(req.params.id);
  if (product) {
    res.render('products/admin/edit', { product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

exports.updateProduct = (req, res) => {
  const updatedProduct = Product.update(req.params.id, req.body);
  if (updatedProduct) {
    res.redirect('/products/admin');
  } else {
    res.status(404).send('Producto no encontrado');
  }
};

exports.deleteProduct = (req, res) => {
  const deleted = Product.delete(req.params.id);
  if (deleted) {
    res.redirect('/products/admin');
  } else {
    res.status(404).send('Producto no encontrado');
  }
};