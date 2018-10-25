const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

router.get('/get', orderController.getAllOrders);
router.get('/get/:id', orderController.getOrderDetails);
router.post('/saveOrder', orderController.addOrder);
module.exports = router;