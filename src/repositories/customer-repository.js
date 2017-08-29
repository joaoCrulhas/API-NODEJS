'use strict';
const mongoose = require ('mongoose');
const customerModel  = mongoose.model('Customer');

exports.get = async() =>{
    console.log("Todos os clientes da loja");
    const clientes = 
    await (customerModel.find({}));
    return (clientes);
}

exports.create = async(data) => {
     console.log("Inserir Novo Cliente");
    var client = new customerModel(data);
    await (client.save());
}

exports.authenticate = async (data) => {
    console.log("Autenticar Usuario \n") ;
    console.log("Verifica se o usuário está cadastrado na base de dados");
    
    const res = await customerModel.findOne({
        email:data.email,
        password: data.password
    });
    return(res);

}

exports.getById = async(id) =>{
    console.log("Todos os clientes da loja");
    const clientes = 
    await (customerModel.findById(id));
    return (clientes);
}
