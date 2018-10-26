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
    loginCookie : req.viewModel.loginCookie
};
  res.render('signup', model);
};

exports.submit = function(req,res){
};