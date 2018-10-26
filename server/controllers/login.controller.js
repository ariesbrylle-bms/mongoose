const User = require('../models/user.model');
const bcrypt = require('bcrypt');
var Cookies = require('cookies');
var randtoken = require('rand-token');
var keys = ['atomic shop'];

exports.getIndex = function(req, res){
    const model = {
        title: 'Login',
        loginCookie: req.viewModel.loginCookie,
        userType: req.viewModel.userType
    };
    res.render('login', model);
};

exports.login = function(req, res){

    if(String(req.body.username) === '' || String(req.body.password) === ''){
        res.json({
            message: 'Username or Password is empty.',
            status: 'Error'
        });
    }

    // validate from usermodel
    User.findOne({ username: req.body.username }, function(err, user){
        if(err){
            return console.log(err);
        }

        if(!user){
            return res.json({
                message: 'Invalid Username',
                status: 'Error'
            });
        }

        bcrypt.compare(req.body.password, user.password, function(err, isCorrect) {
            if(isCorrect){
                // create cookie
                var cookies = new Cookies(req, res, { keys: keys });

                // get unique token
                var LoginToken = cookies.get('LoginToken', { signed: true });

                if(!LoginToken){
                    LoginToken = randtoken.generate(16);
                    cookies.set('LoginToken', LoginToken, { signed: true });
                } else {
                    LoginToken = cookies.get('LoginToken', { signed: true });
                }

                var userId = cookies.get('userId', { signed: true });

                if(!userId){
                    userId = user._id;
                    cookies.set('userId', userId, { signed: true });
                } else {
                    userId = cookies.get('userId', { signed: true });
                }

                var userType = '';
                console.log(user.userType);
                console.log(userType);
                if(!userType){
                    userType = user.userType;
                    cookies.set('userType', userType, { signed: true });
                } else {
                    userType = cookies.get('userType', { signed: true });
                }

                var url = '/';

                if(String(userType) === 'Administrator'){
                    url = '/admin';
                }

                return res.json({
                    message: 'Correct Password and Username.',
                    status: 'Success',
                    url: url
                });
            } else {
                return res.json({
                    message: 'Invalid Password.',
                    status: 'Error'
                });
            }
        });
    });
};