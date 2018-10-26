const express = require('express');
const router = express.Router(); // eslint-disable-line
const userController = require('../controllers/user.controller');

router.get('/', userController.getAll);
router.get('/get', userController.getUserInfo);
router.get('/:id', userController.getIndividual);
router.post('/add', userController.addUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;