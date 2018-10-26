const express = require('express');
const router = express.Router(); // eslint-disable-line

router.get('/', function getIndexPage(req, res) {
    //viewModel.notes = store.get('notes');
    const model = {
        title: req.viewModel.title,
        loginCookie: req.viewModel.loginCookie,
        userType: req.viewModel.userType
    };
    res.render('checkout.pug', model);
});

router.post('/', function getIndexPage(req, res) {
    //viewModel.notes = store.get('notes');
    const model = {
        title: req.viewModel.title,
        loginCookie: req.viewModel.loginCookie,
        userType: req.viewModel.userType
    };
    res.render('checkout.pug', model);
});

module.exports = router;