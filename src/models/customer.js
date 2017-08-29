/*
    AULA 15;
    https://www.youtube.com/watch?v=xMG68bH5ohE&index=15&list=PLHlHvK2lnJndvvycjBqQAbgEDqXxKLoqn
*/
'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schemaProduct = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required : true
    },
    roles:[{
        type:String,
        required:true,
        enum:['user','admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('Customer', schemaProduct);
 