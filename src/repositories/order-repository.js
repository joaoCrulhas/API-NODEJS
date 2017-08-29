'use strict';
const mongoose = require ('mongoose');
const orderModel  = mongoose.model('Order');


exports.get = async() =>{
    console.log("Recuperando as Orders");
    var res = await(orderModel.find({},
    'number status customer items ')
    .populate('customer', 'name')
    .populate('items.product','title'));
    return(res);

}

exports.create = async(data) => {
    console.log("Inserir Nova Order - Repository ");
    var order = new orderModel(data);
    await (order.save());

}
