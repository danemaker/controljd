'use strict'

var express= require('express');
var UsuarioController=require('../controllers/usuario');

var api= express.Router();
var md_auth= require('../middlewares/autheticated');

var multipart=require('connect-multiparty');
var md_upload=multipart({uploadDir: './uploads/usuarios'});

api.get('/probando-controlador' ,md_auth.ensureAuth, UsuarioController.pruebas);
api.delete('/remove/:id',md_auth.ensureAuth, UsuarioController.deleteUsuario);
api.post('/register', UsuarioController.saveUsuario);
api.post('/login', UsuarioController.loginUsuario);
api.post('/update-usuario/:id',md_auth.ensureAuth, UsuarioController.updateUsuario);
api.post('/upload-image-usuario', [md_auth.ensureAuth,md_upload], UsuarioController.uploadImage);
api.get('/get-image-usuario/:imageFile', UsuarioController.getImageFile);

module.exports=api;