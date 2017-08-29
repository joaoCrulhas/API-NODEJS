'use strict';

const repositoryOrder = require('../repositories/order-repository.js');
const guid = require ('guid');
const authService = require('../services/auth-service.js');

exports.get  = async(req,res,next) => {
console.log( "Listagem de Orders controlador");
    try{
    var data = await repositoryOrder.get();
    res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message:"Erro ao listar Order",
    });
}
}

// POST dos clientes
exports.post = async(req,res,next) => {
console.log('Controlador Adicionar Order');
    try{
 const token = req.body.token || req.query.token || req.headers['x-access-token'];
 const data  = await authService.decodeToken(token);

    await (repositoryOrder.create({
           customer: data.id,
           number : guid.raw().substring(0,6),
           items:req.body.items
       }));

       res.status(201).send({message: "Pedido Cadastrado com sucesso"});
    }catch (e) {
        console.log(e);
        res.status(500).send({
            message:"Erro ao cadastrar pedido",
    });
}}
