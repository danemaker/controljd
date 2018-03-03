'use strict'

var express= require('express');
var bodyParser=require('body-parser');
var path = require('path');

var app=express();

//cargar rutas
var usuario_routes=require('./routes/usuario');
var cliente_routes=require('./routes/cliente');
var documento_routes=require('./routes/documento');
var articulo_routes=require('./routes/articulo');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin,X-Requested-With, Content-Type, Accept,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
    });

//rutas base
app.use('/', express.static('client', {redirect: false}));
app.use('/control', usuario_routes);
app.use('/control', cliente_routes);
app.use('/control', documento_routes);
app.use('/control', articulo_routes);

app.get('*', function(req, res, next){
	res.sendFile(path.resolve('client/index.html'));
});

module.exports=app;