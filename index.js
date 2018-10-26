const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var Cookies = require('cookies');
var randtoken = require('rand-token');
const multer = require('multer');
const fs = require('fs');

const db = mongoose.connection;

const app = express();
const PORT = 3400;

var keys = ['atomic shop'];


// import routes
const user = require('./server/routes/user.routes');
const product = require('./server/routes/product.routes');
const order = require('./server/routes/order.routes');
const index = require('./server/routes/index.routes');
const login = require('./server/routes/login.routes');
const admin = require('./server/routes/admin.routes');
const checkout = require('./server/routes/checkout.routes');
const cart = require('./server/routes/cart.routes');
const signup = require('./server/routes/signup.routes');

const upload = multer({
    dest: './public/uploads'
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// Set up mongoose connection
let devDb = 'mongodb://unionbank-blockchain:blockchain1@ds141613.mlab.com:41613/onlineshopping';
const mongoDB = process.env.MONGODB_URI || devDb;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
    var cookies = new Cookies(req, res, { keys: keys });
    // get unique token
    var uniqueToken = '';

    if(!cookies.get('Token', { signed: true })){
        uniqueToken = randtoken.generate(16);
        cookies.set('Token', uniqueToken, { signed: true });
    } else {
        uniqueToken = cookies.get('Token', { signed: true });
    }

    var loginCookie = '';
    if(!cookies.get('LoginToken', { signed: true })){
    // do nothing
    } else {
        loginCookie = cookies.get('LoginToken', { signed: true });
    }

    // Set the cookie to a value
    cookies.set('LastVisit', new Date().toISOString(), { signed: true });

    var userType = cookies.get('userType', { signed: true });

    if(!userType){
        userType = 'Customer';
        cookies.set('userType', userType, { signed: true });
    } else {
        userType = cookies.get('userType', { signed: true });
    }

    req.viewModel = {
        title: 'Online Shopping',
        loginCookie: loginCookie,
        userType: userType
    };

    // console.log(cookies);

    next();
});

app.get('/isLogin', (req, res)=> {
    var cookies = new Cookies(req, res, { keys: keys });
    // get unique token

    var loginCookie = '';
    if(!cookies.get('LoginToken', { signed: true })){
    // do nothing
    } else {
        loginCookie = cookies.get('LoginToken', { signed: true });
    }

    if(String(loginCookie) === ''){
        return res.json({
            status: 'error'
        });
    } else {
        return res.json({
            satus: 'success'
        });
    }
});



app.get('/logout', (req, res)=> {
    var cookies = new Cookies(req, res, { keys: keys });
    cookies.set('LoginToken', null, { signed: true });
    cookies.set('userType', null, { signed: true });
    cookies.set('userId', null, { signed: true });
    res.redirect('/');
});

// routes
app.use('/', index);
app.use('/login', login);
app.use('/admin', admin);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/user', user);
app.use('/products', product);
app.use('/order', order);
app.use('/signup', signup);

app.post('/upload_image', upload.single('file' /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        //console.log(req.file);
        var fileExt = path.extname(req.file.originalname).toLowerCase();

        var fname = randtoken.generate(7);
        const targetPath = path.join(__dirname, './public/uploads/'+ fname  + fileExt);

        if(fileExt === '.png' || fileExt === '.jpg' || fileExt === '.jpeg' || fileExt === '.tif' || fileExt === '.gif') { // eslint-disable-line
            fs.rename(tempPath, targetPath, err => {
                if(err) { return console.log(err); }

                res.json({
                    status: 'Success',
                    message: 'File has been uploaded successfully',
                    path: '/uploads/'+ fname + fileExt
                });
            });
        } else {
            fs.unlink(tempPath, err => {
                if(err) { return console.log(err); }

                res.json({
                    status: 'Error',
                    message: 'Image File Only',
                    path: ''
                });
            });
        }
    }
);

// start server
app.listen(PORT, () => {
    console.log(`Server is running under port ${PORT}`);
});