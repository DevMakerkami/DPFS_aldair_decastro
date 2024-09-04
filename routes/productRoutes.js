const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas para clientes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetail);

// Rutas de administración
router.get('/admin/list', productController.getAdminProductList);
router.get('/admin/create', productController.getCreateProductForm);
router.post('/admin', productController.createProduct);
router.get('/admin/:id/edit', productController.getEditProductForm);
router.put('/admin/:id', productController.updateProduct);
router.delete('/admin/:id', productController.deleteProduct);

module.exports = router;