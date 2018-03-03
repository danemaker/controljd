'use strict'

var path=require('path');
var fs=require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Cliente = require('../models/cliente');
var Documento = require('../models/documento');
var Articulo = require('../models/articulo');

function getArticulo(req, res){
    var articuloId= req.params.id;

    Articulo.findById(articuloId).populate({path: 'documento'}).exec((err, articulo)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!articulo){
                res.status(404).send({message: 'El artículo no existe'});
            }else{
                res.status(200).send({articulo});
            }
        }
    });
}

function saveArticulo(req, res){
    var articulo = new Articulo();

    var params = req.body;
    articulo.name = params.name;
    articulo.description = params.description;
    articulo.price = params.price;
    articulo.image = params.image;
    articulo.documento = params.documento;

    articulo.save((err, articuloStored)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!articuloStored){
                res.status(404).send({message: 'No se ha guardado el articulo'});
            }else{
                res.status(200).send({articulo: articuloStored});
            }
        }
    });
}

function getArticulos(req, res){
    var documentoId = req.params.documento;

    if(!documentoId){
        //sacar todos los albumes de la base de datos
        var find = Articulo.find({}).sort('name');
    }else{
        //sacar los albums de un artista concreto de la ddbb
        var find = Articulo.find({documento: documentoId}).sort('name');
    }
    find.populate({
        path: 'documento',
        populate:{
            path: 'cliente',
            model:'Cliente'
        }
    }).exec((err, articulos)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!articulos){
                res.status(404).send({message: 'No hay articulos'});
            }else{
                res.status(200).send({articulos});
            }
        }
    });
}

function updateArticulo(req, res){
    var articuloId = req.params.id;
    var update = req.body;

    Articulo.findByIdAndUpdate(articuloId, update, (err, articuloUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!articuloUpdated){
                res.status(404).send({message: 'No de ha actualizado la cación'});
            }else{
                res.status(200).send({articulo: articuloUpdated});
            }
        }
    });
}

function deleteArticulo(req, res){
    var articuloId = req.params.id;

    Articulo.findByIdAndRemove(articuloId, (err, articuloRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!articuloRemoved){
                res.status(404).send({message: 'No de ha borrado el artículo'});
            }else{
                res.status(200).send({articulo: articuloRemoved});
            }
        }
    });
}

function uploadImage(req, res){
    var file_name='No subido...';

    if(req.files){
        var file_path=req.files.image.path;
        //cogemos el nombre del fichero
        var file_split=file_path.split('/');
        var file_name=file_split[2];

        //cogemos la extensión del fichero
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]

        if(file_ext=='png' || file_ext=='jpg' || file_ext=='gif'){
           res.status(200).send({image: file_name});
        }
        console.log(file_path);
    }else{
        res.status(200).send({message: 'No se ha subido ninguna imagen'});
    }
}
 
function getImageFile(req, res){
    var imagefile=req.params.imageFile;
    var path_file='./uploads/articulos/'+ imagefile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe la imagen...'})
        }
    });
}


module.exports= {
    getArticulo,
    saveArticulo,
    getArticulos,
    updateArticulo,
    deleteArticulo,
    uploadImage,
    getImageFile
}