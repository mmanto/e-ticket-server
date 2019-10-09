import { Router, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();


// Login
userRoutes.post('/login', (req: Request, res: Response ) => {

    const body = req.body;

    Usuario.findOne({ cuit: body.cuit }, ( err, userDB ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }

        if ( userDB.compararPassword( body.password ) ) {

            const tokenUser = Token.getJwtToken({
                _id                 : userDB._id,
                nombre              : userDB.nombre,
                domicilioCalle      : userDB.domicilioCalle,
                domicilioNumero     : userDB.domicilioNumero,
                domicilioLocalidad  : userDB.domicilioLocalidad,
                domicilioProvincia  : userDB.domicilioProvincia,
                cuit                : userDB.cuit,
                iibb                : userDB.iibb,
                inicioActividad     : userDB.inicioActividad,
                respAnteIva         : userDB.respAnteIva,
                email               : userDB.email,
            });

            res.json({
                ok                  : true,
                token               : tokenUser,
                user                : userDB 
            });

        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos ***'
            });
        }


    })


});



// Crear un usuario
userRoutes.post('/create', ( req: Request, res: Response ) => {

    const user = {
        nombre              : req.body.nombre, // Razón social
        domicilioCalle      : req.body.domicilioCalle,
        domicilioNumero     : req.body.domicilioNumero,
        domicilioLocalidad  : req.body.domicilioLocalidad,
        domicilioProvincia  : req.body.domicilioProvincia,
        cuit                : req.body.cuit,
        iibb                : req.body.iibb,
        inicioActividad     : req.body.inicioActividad,
        respAnteIva         : req.body.respAnteIva,
        email               : req.body.email,
        password            : bcrypt.hashSync(req.body.password, 10)
    };

    Usuario.create( user ).then( userDB => {

        const tokenUser = Token.getJwtToken({
            nombre              : userDB.nombre,
            domicilioCalle      : userDB.domicilioCalle,
            domicilioNumero     : userDB.domicilioNumero,
            domicilioLocalidad  : userDB.domicilioLocalidad,
            domicilioProvincia  : userDB.domicilioProvincia,
            cuit                : userDB.cuit,
            iibb                : userDB.iibb,
            inicioActividad     : userDB.inicioActividad,
            respAnteIva         : userDB.respAnteIva,
            _id                 : userDB._id,
            email               : userDB.email,
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });




});


// Actualizar usuario TODO
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const user = {
        cuit     : req.body.cuit || req.usuario.cuit,
        nombre: req.body.nombre || req.usuario.nombre,
        email : req.body.email  || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            cuit     : req.body.cuit,
            nombre: userDB.nombre,
            email: userDB.email,
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });

});



userRoutes.get('/', [ verificaToken ], ( req: any, res: Response ) => {

    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });

});


export default userRoutes;
