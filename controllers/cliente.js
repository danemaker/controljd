'use strict'

var path=require('path');
var fs=require('fs');
var mongoosePaginate=require('mongoose-pagination');

var Cliente = require('../models/cliente');
var Documento = require('../models/documento');
var Articulo = require('../models/articulo');

function getCliente(req, res){
    var clienteId=req.params.id;

    Cliente.findById(clienteId, (err, cliente)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!cliente){
                res.status(404).send({message: 'El cliente no existe'});
            }else{
                res.status(200).send({cliente});

            }
        }
    });
}

function getClientes(req, res){

    Cliente.find({}, function(err, clientes, total){
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!clientes){
                res.status(404).send({message: 'No hay clientes!!'});
            }else{
                return res.status(200).send({total_items:total,clientes: clientes})
            }
        }
    });
}

function saveCliente(req, res){
    var cliente = new Cliente();
    var params = req.body;
	
	
	cliente.dni = params.dni;
    cliente.name = params.name;
    cliente.surname = params.surname;
    cliente.tlf = params.tlf;

    cliente.save((err, clienteStored)=>{
        if(err){
            res.status(500).send({message: 'Error al guardar cliente'});
        }else{
            if(!clienteStored){
                res.status(404).send({message: 'El cliente no ha sido guardado'});
            }else{
                res.status(200).send({cliente:clienteStored});
            }
        }
    });
}

 function updateCliente(req, res){
     var clienteId=req.params.id;
     var update=req.body;

     Cliente.findByIdAndUpdate(clienteId, update, (err,clienteUpdated)=>{
         if(err){
             res.status(500).send({message: 'Error al guardar el cliente'});
         }else{
             if(!clienteUpdated){
                 res.status(404).send({message: 'El cliente no existe'});
             }else{
                 res.status(200).send({cliente: clienteUpdated});
             }
         }
     });
 }

 function deleteCliente(req, res){
     var clienteId=req.params.id;

     Cliente.findByIdAndRemove(clienteId,(err,clienteRemoved)=>{
         if(err){
             res.status(500).send({message: 'Error al eliminar cliente'});
         }else{
             if(!clienteRemoved){
                 res.status(404).send({message: 'El cliente no ha sido eliminado'});
             }else{
                 console.log(clienteRemoved);

                 Documento.find({cliente:clienteRemoved._id}).remove((err, documentoRemoved)=>{
                     if(err){
                         res.status(500).send({message: 'Error al eliminar el documento'});
                     }else{
                         if(!documentoRemoved){
                             res.status(404).send({message: 'El cliente no ha sido eliminado'});
                         }else{
                             Articulo.find({documento: documentoRemoved._id}).remove((err, articuloRemoved)=>{
                                 if(err){
                                     res.status(500).send({message: 'Error al eliminar el articulo'});
                                 }else{
                                     if(!articuloRemoved){
                                         res.status(404).send({message: 'El cliente no ha sido eliminado'});
                                     }else{
                                         res.status(200).send({cliente: clienteRemoved});
                                     }
                                 }
                             });
                         }
                     }
                 });
             }
         }
     });
 }



    

module.exports={
    getCliente,
    saveCliente,
    getClientes,
    updateCliente,
    deleteCliente
}