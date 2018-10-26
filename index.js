const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var http = require('http')
var Cookies = require('cookies')
var randtoken = require('rand-token');
const db = mongoose.connection;

const app = express();
const PORT = 3400;

var keys = ['atomic shop']


// import routes
const user = require('./server/routes/user.routes');
const product = require('./server/routes/product.routes');
const order = require('./server/routes/order.routes');
const index = require('./server/routes/index.routes');
const login = require('./server/routes/login.routes');
const admin = require('./server/routes/admin.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// Set up mongoose connection
let dev_db_url = 'mongodb://unionbank-blockchain:blockchain1@ds141613.mlab.com:41613/onlineshopping';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
  var cookies = new Cookies(req, res, { keys: keys })
  // get unique token
  var uniqueToken = '';

  if (!cookies.get('Token', { signed: true })){
    uniqueToken = randtoken.generate(16);
    cookies.set('Token', uniqueToken, { signed: true })
  }else{
    uniqueToken = cookies.get('Token', { signed: true })
  }
 
  var loginCookie = '';
  if (!cookies.get('LoginToken', { signed: true })){
    // do nothing
  }else{
    loginCookie = cookies.get('LoginToken', { signed: true })
  }
 
  // Get a cookie
  var lastVisit = cookies.get('LastVisit', { signed: true })
 
  // Set the cookie to a value
  cookies.set('LastVisit', new Date().toISOString(), { signed: true })

  req.viewModel = {
    title: 'Online Shopping',
    loginCookie : loginCookie
  };

  // console.log(cookies);

  next();
});

app.get('/signup', (req,res)=> {
  res.render('signup', {title : 'Sign Up'});
});

app.get('/logout', (req,res)=> {
  var cookies = new Cookies(req, res, { keys: keys })
  cookies.set('LoginToken', '', { signed: true })
  cookies.set('userType', '', { signed: true })
  cookies.set('userId', '', { signed: true })
  res.redirect('/');
});

// routes
app.use('/', index);
app.use('/login', login);
app.use('/admin', admin);
app.use('/user', user);
app.use('/products', product);
app.use('/order', order);

// start server
app.listen(PORT, () => {
  console.log(`Server is running under port ${PORT}`);
});