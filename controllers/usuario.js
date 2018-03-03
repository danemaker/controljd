'use strict'

var fs=require('fs');
var path = require('path');
var bcrypt=require('bcrypt-nodejs');
var Usuario=require('../models/usuario');
var jwt=require('../service/jwt');

function pruebas (req , res){
    res.status(200).send({
        message: 'Probando el controlador de usuario'
    })

}

function saveUsuario(req, res){
    var usuario=new Usuario();
    var params = req.body;

    usuario.name=params.name;
    usuario.surname=params.surname;
    usuario.email=params.email;
    usuario.rol='USUARIO';
    usuario.image= params.image;

    if(params.password){
        //emcriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null , function(err, hash){
            usuario.password=hash;
            if(usuario.name!=null && usuario.surname!=null && usuario.email!=null){
                //guardar el usuario
                usuario.save((err, usuarioStored)=>{
                    if(err){
                        res.status(500).send({message:'Error al guardar usuario'});
                    }else{
                        if(!usuarioStored){
                            res.status(400).send({message: 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({usuario:usuarioStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message:'Rellena todos los campos'});
            }
        });
    }else{
        res.status(500).send({message:'Introduce la contraseña'});
    }
}

function loginUsuario(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;
    Usuario.findOne({email:email.toLowerCase()}, (err,usuario)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!usuario){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                bcrypt.compare(password, usuario.password, function (err, check){
                    if(check){
                        //devolvemos usuario logueado
                        if(params.gethash){
                            res.status(200).send({token: jwt.createToken(usuario)});
                        }else{
                            res.status(200).send({usuario});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no se ha podido logear'});
                    }
                });
            }
        }

    });

}

function deleteUsuario(req, res){
    var articuloId = req.params.id;

    Usuario.findByIdAndRemove(articuloId, (err, usuarioRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!usuarioRemoved){
                res.status(404).send({message: 'No de ha borrado el usuario'});
            }else{
                res.status(200).send({usuario: usuarioRemoved});
            }
        }
    });
}

function updateUsuario(req, res){
    var usuarioId = req.params.id;
    var update = req.body;
	var usuario=new Usuario();
    var params = req.body;


    Usuario.findByIdAndRemove(usuarioId, update, (err, usuarioUpdated)=>{
       if(err){
           res.status(500).send({message: 'Error al actualizar el usuario'});
       }else{
           if(!usuarioUpdated){
               res.status(404).send({message: 'No se ha podido actualizar el usuario'});
           }else{
               res.status(200).send({usiario: usuarioUpdated});
           }
       } 
    });
	
	
	usuario.name=params.name;
    usuario.surname=params.surname;
    usuario.email=params.email;
    usuario.rol= params.rol;
    usuario.image= params.image;

    if(params.password){
        //emcriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null , function(err, hash){
            usuario.password=hash;
            if(usuario.name!=null && usuario.surname!=null && usuario.email!=null){
                //guardar el usuario
                usuario.save((err, usuarioStored)=>{
                    if(err){
                        //res.status(500).send({message:'Error al guardar usuario'});
                    }else{
                        if(!usuarioStored){
                            res.status(400).send({message: 'No se ha registrado el usuario'});
                        }else{
                            //res.status(200).send({usuario:usuarioStored});
                        }
                    }
                });
            }else{
                //res.status(200).send({message:'Rellena todos los campos'});
            }
        });
    }else{
        //res.status(500).send({message:'Introduce la contraseña'});
    }
	
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
    var path_file='./uploads/usuarios/'+ imagefile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message:'No existe la imagen...'})
        }
    });
}

module.exports={
    pruebas,
    saveUsuario,
    loginUsuario,
    updateUsuario,
    uploadImage,
    getImageFile,
	deleteUsuario
};

