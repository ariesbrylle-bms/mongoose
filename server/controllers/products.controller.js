const Product = require('../models/product.model');
var Cookies = require('cookies')
var keys = ['atomic shop']

exports.addProduct = function (req, res) {
  var cookies = new Cookies(req, res, { keys: keys })
  var userId = cookies.get('userId', { signed: true })
        
  if (!userId){
    userId = user._id;
    cookies.set('userId', userId, { signed: true })
  }else{
    userId = cookies.get('userId', { signed: true })
  }

  let product = new Product(
      {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        photo_path: req.body.photo_path,
        quantity: req.body.quantity,
        price: req.body.price,
        addedBy : userId,
        dateAdded : new Date()
      }
  );

  product.save(function (err, prod) {
      if (err) {
        console.log(err);
        return res.json({
          message : "There is something wrong with your form, please check and try again",
          status : "Error"
        });
      }
      
      return res.json({
        message : "Product has been successfully added.",
        status : "Success"
      });
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

  Product.findOneAndUpdate({_id : req.params.id}, {$set: ProductData}, function (err, product) {
      if (err){
        return res.json({
          message : "There is something wrong with your form, please check and try again",
          status : "Error"
        });
      }
      return res.json({
        message : "Product has been successfully updated.",
        status : "Success"
      });
  });
};

exports.updateProductStatus = function(req,res){
  let ProductData = 
  {
        status: 'Active',
        updatedBy : req.body.addedBy,
        dateUpdated : new Date()
  }

  Product.findOneAndUpdate({_id : req.params.id}, {$set: ProductData}, function (err, product) {
      if (err){
        return res.json({
          message : "There is something wrong with your form, please check and try again",
          status : "Error"
        });
      }
      return res.json({
        message : "Product has been successfully enabled.",
        status : "Success"
      });
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

  Product.findOneAndUpdate({_id : req.params.id}, {$set: ProductData}, function (err, product) {
      if (err) {
        return res.json({
          message : "There is something wrong with your form, please check and try again",
          status : "Error"
        });
      };
      return res.json({
        message : "Product has been successfully deactivated.",
        status : "Success"
      });
  });
};

exports.getAll = function(req,res){
  Product.find().populate({path : 'addedBy'}).exec(function(err,product){
    if(err){
      res.json(err);
    }

    res.json(product);
  });
};

exports.getTopProducts = function(req,res){
  Product.find().sort({dateAdded: 1}).limit(4).exec(function(err,product){
    if(err){
      res.json(err);
    }

    res.json(product);
  });
};

exports.getNewProducts = function(req,res){
  Product.find().sort({dateAdded: -1}).limit(4).exec(function(err,product){
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