const Product = require('../models/product.model');

//Simple version, without validation or sanitation

exports.product_create = function (req, res) {
  let product = new Product(
      {
        sku: 'SKU1',
        name: 'S7 Edge',
        description: 'This is a samsung product',
        photo_path: '/photo.jpeg',
        quantity: 100,
        price: 35100.50,
        addedBy : 1,
        updatedBy : 1
      }
  );

  product.save(function (err) {
      if (err) {
          return console.log(err);
      }
      res.send('Product Created successfully')
  })
};

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};