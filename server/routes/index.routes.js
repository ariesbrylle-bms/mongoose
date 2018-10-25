const express = require('express');
const router = express.Router();

router.get('/', function getIndexPage(req, res) {
    //viewModel.notes = store.get('notes');
    const model = {
        title: req.viewModel.title,
        seasons: ['Hawk 1', 'Hawk 2', 'Hawk 3', 'Hawk 4', 'Hawk 5']
    };
    res.render('index.pug', model);
  });

module.exports = router;