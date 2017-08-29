'use strict';
const mongoose = require ('mongoose');
const customerModel = mongoose.model('Customer');
const validatorContract = require('../validators/validator.js');
const repositoryCustomer = require('../repositories/customer-repository.js');
const md5 = require ('md5');
const emailService = require('../services/email-service.js');
const authService = require('../services/auth-service.js');

exports.get  = async(req,res,next) => {
console.log( "Listagem de Clientes controlador");
    try{
    var data = await repositoryCustomer.get();
    res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message:"Erro ao listar Clientes",
    });
}
}
// POST dos clientes
exports.post = async(req,res,next) => {
    console.log( "Customer Controller \n\n ");
   let contract = new validatorContract();
   contract.hasMinLen(req.body.name,5,"Nome Deve ter maior que 5 caracteres");
   contract.isEmail(req.body.email,"E-mail inserido errado");
   contract.hasMinLen(req.body.password,3,"Senha deve ter mais que 3 caracteres");

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return; 
    }
    try{
    
    let dados = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY),
        roles:['user']
    };

    console.log(" Insercao Dados Clientes " + dados);
    await (repositoryCustomer.create(dados));
   
    emailService.send(req.body.email, 
    "Bem vindo",
    global.EMAIL_TMPL.replace('{0}',
    req.body.name));

    res.status(201).send({message: "Cliente adicionado"});
    } catch (e) {
        res.status(500).send({
            message:"Erro ao inserir Cliente",
    });
    console.log(e);
}
}

// Autenticar dos clientes
exports.authenticate = async(req,res,next) => {
    console.log( " \n \n Controler Customer Authenticate  ");
    try{
//customer vai receber o registro do cliente
//nesta variável teremos acesso a todos os campos dos clientes
//Sempre usamos essa sintaxe neste projeto para trabalhar com senhas, 
//pois estmaos encriptando a senha     
const  customer= await repositoryCustomer.authenticate({
     email:req.body.email,
     password: md5(req.body.password + global.SALT_KEY)
    });
    console.log(customer);

    if(!customer){
   res.status(404).send({
    message:"Usuarios ou senha invalidos"
  });
    return;
}
//Esse código ab aixo será executado se 
//a senha e o email estiver corretos.
   const token = await
    authService.generateToken(
        {
        id:customer._id,
        email:customer.email, 
        name:customer.name,
        roles: customer.roles
        });
   res.status(201).send({
    token:token,
    data:{
        email:customer.email,
        name:customer.name
    }
   });
    }catch (e) {
      console.log(e);
}
}

// Autenticar dos clientes
exports.refreshToken = async(req,res,next) => {
    console.log( " \n \n Método para Refresh Token  ");
    try{

 const token = req.body.token  || req.query.token  || req.headers['x-access-token'];
 const data  = await authService.decodeToken(token);
 console.log(data);



const  customer= await repositoryCustomer.getById(data.id);
    console.log(customer);

    if(!customer){
   res.status(401).send({
    message:"Cliente Não Encontrado"
  });
    return;
}

   const tokenData = await
    authService.generateToken(
        {
        id:customer._id,
        email:customer.email, 
        name:customer.name,
        roles: customer.roles

        });
   res.status(201).send({
    token:token,
    data:{
        email:customer.email,
        name:customer.name
    }
   });
    }catch (e) {
      console.log(e);
}
}