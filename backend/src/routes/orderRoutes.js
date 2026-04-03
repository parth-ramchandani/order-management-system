const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', (req, res) => orderController.getAllOrders(req, res));
router.post('/', (req, res) => orderController.createOrder(req, res));

module.exports = router;
