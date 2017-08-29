'use strict';
var mongoose = require('mongoose');

const express = require ('express');
const config  = require('./config.js');
const app = express();
const router = express.Router();
const bp = require('body-parser');

// Conecta com o banco
mongoose.connect(config.connectString);
//Carregar as models
const product = require('./models/product.js');
const customer = require('./models/customer.js');
const order = require('./models/order.js');

//Cria as rotas
const indexRoutes = require('./routes/index.js');
const productsRoutes = require ('./routes/product.js');
const customerRoutes = require ('./routes/customer.js');
const orderRoutes = require ('./routes/order.js');

app.use(bp.json({
    limit:'5mb'
}));
app.use(bp.urlencoded(
    {extended:false}
));


app.use('/',indexRoutes);
app.use('/products', productsRoutes);
app.use('/customer', customerRoutes);
app.use('/orders', orderRoutes);


module.exports = app;
/*
https://www.youtube.com/watch?v=bwv2qjzHH7w&index=30&list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn
*/