const User = require('../models/user.model');
const bcrypt = require('bcrypt');
var http = require('http')
var Cookies = require('cookies')
var randtoken = require('rand-token');
var keys = ['atomic shop']

const saltRounds = 10;
let password = '';

exports.getSignup = function(req,res){
  const model = {
    title: 'Sign Up',
    loginCookie : req.viewModel.loginCookie,
    userType : req.viewModel.userType
};
  res.render('signup', model);
};

exports.submit = function(req,res){
  var cookies = new Cookies(req, res, { keys: keys })

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err){
      return res.json({
        status : "Error",
        message : "Error in encrypting password"
      })
    }
    password = hash;
  
    let UserData = new User(
      {
        username: req.body.username,
        password: password,
        userType: 'Customer',
        name: {
          fname: req.body.fname,
          mname: req.body.mname,
          lname: req.body.lname,
          nameExt: req.body.nameExt
        },
        photo_path: '/photo',
        emailAddress: req.body.email,
        mobileNo: req.body.phoneNo,
        address: {
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          province: req.body.province,
          zipCode: req.body.postalCode
        },
        status: 'Active',
        dateAdded : new Date()
      }
    );

    UserData.save(function (err,user) {
        if (err) {
            return res.json({
              status : "Error",
              message : "Error in creating user Account."
            })
        }


        console.log(user)
        // get unique token
      var LoginToken = cookies.get('LoginToken', { signed: true })
        
        if (!LoginToken){
          LoginToken = randtoken.generate(16);
          cookies.set('LoginToken', LoginToken, { signed: true })
        }else{
          LoginToken = cookies.get('LoginToken', { signed: true })
        }

        var userId = cookies.get('userId', { signed: true })
      
        if (!userId){
          userId = user._id;
          cookies.set('userId', userId, { signed: true })
        }else{
          userId = cookies.get('userId', { signed: true })
        }

        var userType = cookies.get('userType', { signed: true })
      
        if (!userType){
          userType = 'Customer';
          cookies.set('userType', userType, { signed: true })
        }else{
          userType = cookies.get('userType', { signed: true })
        }
  
        return res.json({
          status : "Success",
          message : "Your account has been successfully created."
        });
    })
  });
};