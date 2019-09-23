import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';

import { models } from 'mongoose';
import { Comprobante } from '../models/comprobante.model';

const comprobantesRoutes = Router();


comprobantesRoutes.route('/:id')
    .get(async function (req, res, next) {
        
        const comprobanteid = req.params.id;

        const comprobante = await Comprobante.findById(comprobanteid)
                                .populate('usuario', '-password')
                                .exec();


        res.json({
            ok: true,
            comprobante
        });
  })

// Obtener Comprobantes paginados
comprobantesRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const comprobante = await Comprobante.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();


    res.json({
        ok: true,
        pagina,
        comprobante
    });


});

/*
comprobantesRoutes.get('/:id', async (req: any, res: Response) => {

    const comprobanteid = req.params.id;

    const comprobante = await Comprobante.findById(comprobanteid)
                            .populate('usuario', '-password')
                            .exec();


    res.json({
        ok: true,
        comprobante
    });


});
*/

// Crear POST
comprobantesRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {

    const body = req.body;
    
    body.usuario = req.usuario._id;

    Comprobante.create( body ).then( async comprobanteDB => {

        await comprobanteDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            comprobante: comprobanteDB
        });

    }).catch( err => {
        res.json(err)
    });

});


export default comprobantesRoutes;
