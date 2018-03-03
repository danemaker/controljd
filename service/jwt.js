'use strict'

var jwt=require('jwt-simple');
var moment=require('moment');
var secret='clave_secreta_curso';

exports.createToken= function(usuario){
    var payload={
        sub: usuario._id,
        name: usuario.name,
        surname: usuario.surname,
        email: usuario.email,
        rol: usuario.rol,
        image: usuario.image,
        iat: moment().unix(),
        exp: moment().add(1, 'hours').unix
    };
    return jwt.encode(payload,secret);
}