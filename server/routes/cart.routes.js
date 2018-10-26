const express = require('express');
const router = express.Router(); // eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
var Cookies = require('cookies')
var keys = ['atomic shop']

const store = new SimpleJsonStore('./cart.json', { notes: [] });

router.post('/', (req, res) => {
  var cookies = new Cookies(req, res, { keys: keys })
  var token = cookies.get('Token', { signed: true })

    const cart = store.get(token);
    if (typeof cart == "undefined"){
      store.set(token,[]);
      cart = [];
    }

    if (cart.length < 1){
      const newCart = {
          productId: req.body.productId,
          qty: req.body.qty,
          price : parseFloat(req.body.price),
          name : req.body.name,
          photo : req.body.photo
        };
    
        cart.push(newCart);
        store.set(token, cart);
    }else{
      var hasFound = false;
      for(var i = 0; i < cart.length; i++){
        if (cart[i].productId == req.body.productId){
          cart[i].qty +=  req.body.qty
          hasFound = true;
          break;
        }
      }

      if(!hasFound){
        const newCart = {
          productId: req.body.productId,
          qty: req.body.qty,
          price : parseFloat(req.body.price),
          name : req.body.name,
          photo : req.body.photo
        };
    
        cart.push(newCart);
      }

      store.set(token, cart);
    }

    res.json(cart);
});

router.get('/', (req, res) => {
   var cookies = new Cookies(req, res, { keys: keys })
   var token = cookies.get('Token', { signed: true })
    const cart = store.get(token);
    if (typeof cart == "undefined"){
      store.set(token,[]);
      cart = [];
    }

    res.json(cart);
});


module.exports = router;