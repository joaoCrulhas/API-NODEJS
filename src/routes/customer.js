'use strict';
/* 
Rota Para os customers:
*/
const express = require ('express');
const router = express.Router();
const controller = require ('../controllers/customer-controller.js');
const authService = require('../services/auth-service.js');

router.get('/',controller.get);
router.post('/',controller.post);
router.post('/authenticate',controller.authenticate);
router.post('/refresh-token'
,authService.authorize,controller.refreshToken);
module.exports = router;
/*

To connect using the mongo shell:
mongo ds058739.mlab.com:58739/db_baltaio -u <dbuser> -p <dbpassword>

To connect using a driver via the standard MongoDB URI (what's this?):

mongodb://<dbuser>:<dbpassword>@ds058739.mlab.com:58739/db_baltaio


*/