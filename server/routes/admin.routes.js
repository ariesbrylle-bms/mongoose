const express = require('express');
const router = express.Router();

router.get('/', function getIndexPage(req, res) {
    const model = {
        title: 'Atomic Shop',
        loginCookie : req.viewModel.loginCookie,
        userType : req.viewModel.userType
    };
    res.render('admin/index.pug', model);
});

router.get('/products', function getIndexPage(req, res) {
    const model = {
        title: 'Atomic Shop',
        loginCookie : req.viewModel.loginCookie,
        userType : req.viewModel.userType
    };
    res.render('admin/products.pug', model);
});

router.get('/orders', function getIndexPage(req, res) {
    const model = {
        title: 'Atomic Shop',
        loginCookie : req.viewModel.loginCookie,
        userType : req.viewModel.userType
    };
    res.render('admin/orders.pug', model);
});

router.get('/users', function getIndexPage(req, res) {
    const model = {
        title: 'Atomic Shop',
        loginCookie : req.viewModel.loginCookie,
        userType : req.viewModel.userType
    };
    res.render('admin/users.pug', model);
});

module.exports = router;