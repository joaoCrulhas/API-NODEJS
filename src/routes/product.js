'use strict';

const express = require ('express');
const router = express.Router();
const controller = require ('../controllers/products-controller.js');
const authService = require('../services/auth-service.js');
// Recuperar produtos.
router.get('/tags/:tag',controller.getByTags);
router.get('/admin/:id',controller.getByID);
router.get('/:slug',controller.getBySlug);
router.get('/',controller.get);
//Inserir Produto
router.post('/',authService.isAdmin,controller.post);
//Atualizar Produto
router.put('/:id',authService.isAdmin,controller.put);
//Deletar Produto
router.delete('/:id',authService.isAdmin,controller.delete);

module.exports = router;

/*
To connect using the mongo shell:
mongo ds058739.mlab.com:58739/db_baltaio -u <dbuser> -p <dbpassword>
To connect using a driver via the standard MongoDB URI (what's this?):
mongodb://<dbuser>:<dbpassword>@ds058739.mlab.com:58739/db_baltaio

*/