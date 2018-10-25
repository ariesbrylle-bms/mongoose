const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3400;

const product = require('./server/routes/product.routes'); // Imports routes for the users
const user = require('./server/routes/user.routes'); // Imports routes for the products

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://unionbank-blockchain:blockchain1@ds141613.mlab.com:41613/onlineshopping';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', user);
app.use('/user', user);
app.use('/products', product);

app.listen(PORT, () => {
  console.log(`Server is running under port ${PORT}`);
});