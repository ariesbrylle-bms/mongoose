const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/get', productsController.getAll);
router.get('/getTop', productsController.getTopProducts);
router.get('/getNew', productsController.getNewProducts);
router.get('/get/:id', productsController.getIndividual);
router.post('/add', productsController.addProduct);
router.put('/update/:id', productsController.updateProduct);
router.put('/update_status/:id', productsController.updateProductStatus);
router.delete('/delete/:id', productsController.deleteProduct);

module.exports = router;