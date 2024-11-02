const { Product, Category } = require('../models');

const productController = {
  // Rutas para clientes
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [{ model: Category }]
      });
      res.render('products/index', { products });
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  },

  getProductDetail: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category }]
      });
      if (product) {
        res.render('products/detail', { product });
      } else {
        res.status(404).render('error', { message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  },

  // Rutas de administración
  getAdminProductList: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [{ model: Category }]
      });
      res.render('admin/products/list', { products });
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  },

  getCreateProductForm: (req, res) => {
    res.render('admin/products/create');
  },

  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.redirect('/products/admin/list');
    } catch (error) {
      res.status(400).render('admin/products/create', { error: error.message });
    }
  },

  getEditProductForm: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (product) {
        res.render('admin/products/edit', { product });
      } else {
        res.status(404).render('error', { message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const [updated] = await Product.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        res.redirect('/products/admin/list');
      } else {
        res.status(404).render('error', { message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).render('admin/products/edit', { error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.redirect('/products/admin/list');
      } else {
        res.status(404).render('error', { message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  }
};

module.exports = productController;