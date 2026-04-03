const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.post('/', (req, res) => productController.createProduct(req, res));

module.exports = router;
