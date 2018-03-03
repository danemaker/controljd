'use strict'

var express = require('express');
var DocumentoController = require('../controllers/documento');

var api = express.Router();
var md_auth = require('../middlewares/autheticated');


api.get('/documento/:id', md_auth.ensureAuth, DocumentoController.getDocumento);
api.post('/documento', md_auth.ensureAuth, DocumentoController.saveDocumento);
api.get('/documento/:cliente?', md_auth.ensureAuth, DocumentoController.getDocumentos);
api.put('/documento/:id', md_auth.ensureAuth, DocumentoController.updateDocumento);
api.delete('/documento/:id', md_auth.ensureAuth, DocumentoController.deleteDocumento);
module.exports=api;