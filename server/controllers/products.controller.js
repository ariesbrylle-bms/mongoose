const Product = require('../models/product.model');

exports.addProduct = function (req, res) {
  let product = new Product(
      {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        photo_path: req.body.photo_path,
        quantity: req.body.quantity,
        price: req.body.price,
        addedBy : req.body.addedBy,
        dateAdded : new Date()
      }
  );

  product.save(function (err, prod) {
      if (err) {
          return console.log(err);
      }
      res.send(prod);
  })
};

exports.updateProduct = function(req,res){
  let ProductData = 
  {
    sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        photo_path: req.body.photo_path,
        quantity: req.body.quantity,
        price: req.body.price,
        updatedBy : req.body.addedBy,
        dateUpdated : new Date()
  }

  Product.findOneAndUpdate(req.params.id, {$set: ProductData}, function (err, product) {
      if (err) return console.log(err);
      res.send('Product updated.');
  });
};

exports.deleteProduct = function(req,res){
  let ProductData = 
  {
    sku: req.body.sku,
        status : 'Deactivated',
        updatedBy : req.body.addedBy,
        dateUpdated : new Date()
  }

  Product.findOneAndUpdate(req.params.id, {$set: ProductData}, function (err, product) {
      if (err) return console.log(err);
      res.send('Product deleted.');
  });
};

exports.getAll = function(req,res){
  Product.find({ status : "Active"}).populate({path : 'addedBy'}).exec(function(err,product){
    if(err){
      res.json(err);
    }

    res.json(product);
  });
};

/*
exports.getAll = function(req,res){
  Product.find({ status : "Active"}).populate({path : 'addedBy', select : 'name address' , populate : { path : 'updatedBy'}}).exec(function(err,product){
    if(err){
      res.json(err);
    }

    res.json(product);
  });
}; 
*/

exports.getIndividual = function(req,res){
  Product.findOne({_id : req.params.id}, function(err,product){
    if(err){
      return console.log(err);
    }

    res.json(product);
  });
};