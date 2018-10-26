const express = require('express');
const router = express.Router();

router.get('/', function getIndexPage(req, res) {
    const model = {
        title: 'Atomic Shop',
        loginCookie : req.viewModel.loginCookie
    };
    res.render('admin/index.pug', model);
  });

module.exports = router;