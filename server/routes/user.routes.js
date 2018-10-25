const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const userController = require('../controllers/user.controller');

// get all products
// router.get('/', userController.product_create);

// // get specific product using _id column
// router.get('/:id', userController.product_create);

// add products
router.post('/add', userController.addUser);

// // update products
router.put('/update/:id', userController.updateUser);

// // delete products
router.delete('/delete/:id', userController.deleteUser);


// // a simple test url to check that all of our files are communicating correctly.
// router.get('/test', userController.test);
module.exports = router;