'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ClienteSchema=Schema({
	dni : String,
    name: String,
	surname: String,
    tlf: String

})

module.exports= mongoose.model('Cliente', ClienteSchema);