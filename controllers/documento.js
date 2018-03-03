'use strict'

var path=require('path');
var fs=require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Cliente = require('../models/cliente');
var Documento = require('../models/documento');
var Articulo = require('../models/articulo');

function getDocumento(req, res ){
    var documentoId= req.params.id;

    Documento.findById(documentoId).populate({path: 'cliente'}).exec((err, documento)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!documento){
                res.status(404).send({message: 'El documento no existe'});
            }else{
                res.status(200).send({documento});
            }
        }
    });

}

function getDocumentos(req, res){
    var clienteId = req.params.cliente;

    if(!clienteId){
        //sacar todos los documentos de la base de datos
        var find = Documento.find({}).sort('date');
    }else{
        //sacar los documentos de un cliente concreto de la ddbb
        var find = Documento.find({cliente: clienteId}).sort('total');
    }
    find.populate({path: 'cliente'}).exec((err, documentos)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!documentos){
                res.status(404).send({message: 'No hay documentos'});
            }else{
                res.status(200).send({documentos});
            }
        }
    });
}
function saveDocumento(req, res){
    var documento = new Documento();

    var params = req.body;
    documento.date = params.date;
    documento.total = params.total;
    documento.cliente = params.cliente;

    documento.save((err, documentoStored)=>{
        if(err){
            res.status(500).send({message: ' Error en el servidor'});
        }else{
            if(!documentoStored){
                res.status(404).send({message: 'El documento no ha sido guardado'});
            }else{
                res.status(200).send({documento: documentoStored});
            }
        }
    });
}
function updateDocumento(req, res){
    var documentoId = req.params.id;
    var update = req.body;

    Documento.findByIdAndUpdate(documentoId, update, (err, documentoUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!documentoUpdated){
                res.status(404).send({message: 'No de ha actualizado el documento'});
            }else{
                res.status(200).send({documento: documentoUpdated});
            }
        }
    });
}

function deleteDocumento(req, res){
    var documentoId=req.params.id;

    Documento.findByIdAndRemove(documentoId,(err, documentoRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar album'});
        }else{
            if(!documentoRemoved){
                res.status(404).send({message: 'El cliente no ha sido eliminado'});
            }else{
                console.log(documentoRemoved);
                 Song.find({documento: documentoRemoved._id}).remove((err, articuloRemoved)=>{
                    if(err){
                         res.status(500).send({message: 'Error al eliminar la articulo'});
                        }else{
                             if(!articuloRemoved){
                                res.status(404).send({message: 'El cliente no ha sido eliminado'});
                                }else{
                                     res.status(200).send({documento: documentoRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }


module.exports = {
    getDocumento,
    saveDocumento,
    getDocumentos,
    updateDocumento,
    deleteDocumento
}