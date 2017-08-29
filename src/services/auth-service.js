'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) =>{
    console.log("Generate Token");
    return(jwt.sign(data,global.SALT_KEY,{expiresIn:'1d'}));
}

exports.decodeToken = async (token) => {
    console.log("\n \n Decodificar Token \n\n\n\n");
    var data = await jwt.verify(token, global.SALT_KEY);
    console.log(data);
    return data;
}

exports.authorize = function (req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("\n Autorizar Token :" + token);
    if(!token){
        res.status(401).json({
            message:"Acesso Restrito"
        });
    }else{
        jwt.verify(token,global.SALT_KEY, function(error,decode){
            if(error){
                res.status(401).json({
                    message:"Token Invalido"
                });
            }else {next();}
        });
    }
}

exports.isAdmin = function(req,res,next){
    console.log("\n Verificar se o usuario é admin");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message:"Token inválid"
        });
    }else{
        jwt.verify(token,global.SALT_KEY, function(error,decode){
            if(error){
                res.status(401).json({
                    message:"Token Invalido"
                });
            }else {
                if(decode.roles.includes('admin')){
                    next();
                }else{
                    res.status(401).json({
                                message:"Funcionalidade restrita para administrador"
                    });
                }
            }
        });
    }


}
