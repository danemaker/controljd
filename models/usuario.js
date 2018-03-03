'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UsuarioSchema=Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    rol: String,
    image: String
})

module.exports = mongoose.model('Usuario', UsuarioSchema);