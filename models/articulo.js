'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ArticuloSchema=Schema({
    name: String, 
    description: String,
    price: String,
    image: String,
    documento: {type: Schema.ObjectId, ref: 'Documento'}
})

module.exports= mongoose.model('Articulo', ArticuloSchema);