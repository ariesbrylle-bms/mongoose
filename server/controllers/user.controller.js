const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let password = '';
var Cookies = require('cookies');
var keys = ['atomic shop'];

//Simple version, without validation or sanitation

exports.addUser = function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err){
            console.log(err);
        }
        password = hash;

        let UserData = new User(
            {
                username: req.body.username,
                password: password,
                userType: req.body.userType,
                name: {
                    fname: req.body.name.fname,
                    mname: req.body.name.mname,
                    lname: req.body.name.lname,
                    nameExt: req.body.name.nameExt
                },
                photo_path: '/photo', // eslint-disable-line
                emailAddress: req.body.emailAddress,
                mobileNo: req.body.mobileNo,
                address: {
                    address1: req.body.address.address1,
                    address2: req.body.address.address2,
                    city: req.body.address.city,
                    province: req.body.address.province,
                    zipCode: req.body.address.zipCode
                },
                status: req.body.status,
                addedBy: req.body.addedBy,
                dateAdded: new Date()
            }
        );

        UserData.save(function(err) {
            if(err) {
                return console.log(err);
            }

            res.send('User Created successfully');
        });
    });


};

exports.updateUser = function(req, res){
    let UserData =
  {
      name: {
          mname: req.body.name.mname,
          lname: req.body.name.lname,
          nameExt: req.body.name.nameExt
      },
      photo_path: '/photo', // eslint-disable-line
      emailAddress: req.body.emailAddress,
      mobileNo: req.body.mobileNo,
      address: {
          address1: req.body.address.address1,
          address2: req.body.address.address2,
          city: req.body.address.city,
          province: req.body.address.province,
          zipCode: req.body.address.zipCode
      },
      updatedBy: req.body.updatedBy,
      dateUpdated: new Date()
  };

    User.findOneAndUpdate(req.params.id, { $set: UserData }, function(err, user) {
        if(err) { return console.log(err); }
        res.send('User updated.');
    });
};

exports.deleteUser = function(req, res){
    let UserData =
  {
      status: 'Deactivated',
      updatedBy: req.body.updatedBy,
      dateUpdated: new Date()
  };

    User.findOneAndUpdate(req.params.id, { $set: UserData }, function(err, user) {
        if(err) { return console.log(err); }
        res.send('User Deleted.');
    });
};

exports.getAll = function(req, res){
    User.find({ status: 'Active' }, function(err, user){
        if(err){
            return console.log(err);
        }

        res.json(user);
    });
};

exports.getIndividual = function(req, res){
    User.find({ _id: req.params.id }, function(err, user){
        if(err){
            return console.log(err);
        }

        res.json(user);
    });
};

exports.getUserInfo = function(req, res){
    var cookies = new Cookies(req, res, { keys: keys });
    var userId = cookies.get('userId', { signed: true });

    if(!userId){
        //userId = user._id;
        //cookies.set('userId', userId, { signed: true });
        return res.json({
            message: 'Unauthorized Access',
            status: 'Error1'
        });
    } else {
        userId = cookies.get('userId', { signed: true });
    }

    User.findOne({ _id: userId }, function(err, user){
        if(err){
            return console.log(err);
        }

        return res.json(user);
    });
};