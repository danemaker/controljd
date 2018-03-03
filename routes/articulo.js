'use strict'

var express = require('express');
var ArticuloController = require('../controllers/articulo');

var api = express.Router();
var md_auth = require('../middlewares/autheticated');

var multipart= require('connect-multiparty');
var md_upload=multipart({uploadDir: './uploads/articulos'});

api.get('/articulo/:id', md_auth.ensureAuth, ArticuloController.getArticulo);
api.post('/articulo', md_auth.ensureAuth, ArticuloController.saveArticulo);
api.get('/articulo/:documento?', md_auth.ensureAuth, ArticuloController.getArticulos);
api.put('/articulo/:id', md_auth.ensureAuth, ArticuloController.updateArticulo);
api.delete('/articulo/:id', md_auth.ensureAuth, ArticuloController.deleteArticulo);
api.post('/upload-image-articulo', [md_auth.ensureAuth, md_upload], ArticuloController.uploadImage);
api.get('/get-image-articulo/:imageFile', ArticuloController.getImageFile);
module.exports = api;