'use strict';
const mongoose = require ('mongoose');
const validatorContract = require('../validators/validator.js');
const productModel = mongoose.model('Product');
const repository = require('../repositories/productrepository.js');
const azure = require('azure-storage');
const config = require('../config.js');
const guid = require('guid');


exports.getByID  = async(req,res,next) => {
   let idProduto = req.params.id;
   console.log(idProduto);

   console.log("Get By ID Controlador ");
    try {
        var data = await (repository.getById(idProduto)); 
        res.status(200).send(data);
        }catch(e){
          res.status(400)
               .send(e);
      }
}

exports.getBySlug  = async (req,res,next) => {
    console.log("GetBySlug Controlador \n ");
    let slugProcurada  = (req.params.slug);

    try{
        var data = await(repository.getBySlug(slugProcurada));
        res.status(200).send(data);
    }catch (e){
    res.status(500).send({
            message:"Erro ao listar produtos",
    });
    }
}

exports.get  = async(req,res,next) => {
console.log( "Listagem de produtos controlador");
    try{
    var data = await repository.get();
    res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message:"Erro ao listar produtos",
    });
}
}


exports.getByTags  = async (req,res,next) => {
    /*
    Este caso req.params.tag pega o :var que 
    é definido na rota;
    */
    console.log("getByTags Controlador");
    let tagsReq = req.params.tag;
    try{
        var data = await (repository.getByTags(tagsReq));
        res.status(200).send(data);
    }catch(e){
        res.status(400).send(e);
    }
}

// POST 
exports.post = async(req,res,next) => {
    console.log( "POST dos produtos Controlador");
    let contract = new validatorContract();
    contract.hasMinLen(req.body.title,3,"Titulo deve ter mais que 3 caracteres");
    contract.hasMinLen(req.body.slug,3,"Slug deve ter mais que 3 caracteres");
    contract.hasMinLen(req.body.description,3,"Description deve ter mais que 3 caracteres");



    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
    const blobSvc = azure.createBlobService(config.containerConnectionString);
    
    let filename = guid.raw().toString + '.jpg';
    let rawData  = req.body.image;
    let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = new Buffer(matches[2],'base64');

    await blobSvc.createAppendBlobFromText('product-images',
    filename, buffer, {contentType : type}, function(error,result,next){
        if(error){
            filename = 'default-product.png';
        }
    });

    let dadosProduct = {
        title:req.body.title,
        slug:req.body.slug,
        description:req.body.description,
        price : req.body.price,
        active:true,
        tags:req.body.tags,
        image: 'https://nodecrulhas.blob.core.windows.net/product-images'+filename
    }

    await (repository.create(dadosProduct));
    res.status(201).send({message: "Produto adicionado"});
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message:"Erro ao cadastrar produto",
    });
}
        
}
// PUT 
exports.put =async (req,res,next) => {
    console.log('Atualizar Controlador');
    let idProduto = req.params.id;
   
    try{
       await (repository.update(idProduto, req.body));
        res.status(200).send({message : "Produto atualizado"});
    }catch(e){
          res.status(400).send({
        message : "Produto não atualizado",
        data : e 
        });    
    }
}


//// DELETE
exports.delete = async (req,res,next) => {
    let idProduto = req.params.id;
    console.log("DELETAR PRODUTO CONTROLADOR");
            
    try{
        await (repository.deletar(idProduto));
        res.status(200).send({message:"Excluido com sucesso"});
    }catch(e) {
        res.status(500).send({
        message : "Produto não excluido",
        data : e 
    });

}
}

