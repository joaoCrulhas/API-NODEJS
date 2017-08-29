'use strict';
const mongoose = require ('mongoose');
const productModel  = mongoose.model('Product');

exports.get = async() =>{
    const resultado = 
    await (productModel
        .find({
          active:true
        }, 'title price slug'));
    return (resultado);
}

exports.getBySlug = async (slug) => {
    console.log("getBySlug: REPOSITORIO " + slug);
    const resultadoGetSlug =
     await (productModel
    .find( {active : true, slug: slug}));
    return(resultadoGetSlug);

}


exports.getByTags = async(tagsReq) => {
    console.log("GET BY TAGS REPO");
    return(    
    productModel
    .find({
        active : true,
        tags: tagsReq
    }));
}

exports.getById = async (IDproduto) => {
 console.log("Get By ID Repository ");
 const res = await (productModel.findById(IDproduto));
 return (res);
}

exports.create = async(data) => {
  
    console.log("Inserir Produto Repositorio");
    
    var product = new productModel(data);
    await (product.save());
}

exports.update = async (id, data) => {
    await (productModel    
    .findByIdAndUpdate(id,{
        $set : {
          title : data.title,
          description: data.description,
          price:data.price ,
          slug: data.slug
        }
    })
);
}


exports.deletar = async(id) => {
    await (productModel.findOneAndRemove(id));
}