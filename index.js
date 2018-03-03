'use strict'

var mongoose=require('mongoose');
var app=require('./app');
var port=process.env.port || 9999;

mongoose.connect('mongodb://localhost:27017/control_node',(err, res)=>{
    if(err){
        throw err;
    }else{
        console.log("La direccion a la base de datos es correcta");

        app.listen(port, function(){
            console.log("Servidor escuchando en http://localhost:" + port);
        })
    }
    
});