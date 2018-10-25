const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express();
const PORT = 3400;

// import routes
const user = require('./server/routes/user.routes');
const product = require('./server/routes/product.routes');
const order = require('./server/routes/order.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set up mongoose connection
let dev_db_url = 'mongodb://unionbank-blockchain:blockchain1@ds141613.mlab.com:41613/onlineshopping';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
app.use('/', user);
app.use('/user', user);
app.use('/products', product);
app.use('/order', order);

// start server
app.listen(PORT, () => {
  console.log(`Server is running under port ${PORT}`);
});