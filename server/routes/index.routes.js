const express = require('express');
const router = express.Router(); // eslint-disable-line

router.get('/', function getIndexPage(req, res) {
    //viewModel.notes = store.get('notes');
    const model = {
        title: req.viewModel.title,
        seasons: ['Hawk 1', 'Hawk 2', 'Hawk 3', 'Hawk 4'],
        loginCookie: req.viewModel.loginCookie,
        userType: req.viewModel.userType
    };
    res.render('index.pug', model);
});

module.exports = router;