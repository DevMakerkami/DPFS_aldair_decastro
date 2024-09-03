const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAdmin } = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductDetail);
router.get('/create', productController.getCreateProductForm); 
router.get('/:id/edit', productController.getEditProductForm); 
router.delete('/:id', productController.deleteProduct);

module.exports = router;  