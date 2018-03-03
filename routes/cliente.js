'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var api = express.Router();
var md_auth = require('../middlewares/autheticated');



api.get('/cliente/:id', md_auth.ensureAuth, ClienteController.getCliente);
api.post('/cliente', md_auth.ensureAuth, ClienteController.saveCliente);
api.get('/cliente/:page?', md_auth.ensureAuth, ClienteController.getClientes);
api.put('/cliente/:id', md_auth.ensureAuth, ClienteController.updateCliente);
api.delete('/cliente/:id', md_auth.ensureAuth, ClienteController.deleteCliente);
module.exports  = api;