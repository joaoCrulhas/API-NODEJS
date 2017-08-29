/*
    AULA 15;
    https://www.youtube.com/watch?v=xMG68bH5ohE&index=15&list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn
*/
'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schemaProduct = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        trim:true,
        index:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price: {
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        required:true,
        default:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    tags: [{
        type:String,
        required:true
    }]
});

module.exports = mongoose.model('Product', schemaProduct);
 