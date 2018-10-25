const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/products.controller');

// get all products
router.get('/', product_controller.product_create);

// get specific product using _id column
router.get('/:id', product_controller.product_create);

// add products
router.post('/add', product_controller.product_create);

// update products
router.put('/update/:id', product_controller.product_create);

// delete products
router.delete('/delete/:id', product_controller.product_create);


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
module.exports = router;