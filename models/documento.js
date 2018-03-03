'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var DocumentoSchema=Schema({
    date: String,
    total: String,
    cliente:{type:Schema.ObjectId, ref: 'Cliente'}
})

module.exports=mongoose.model('Documento', DocumentoSchema);