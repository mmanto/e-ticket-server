"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const cItem_model_1 = require("../models/cItem.model");
const itemsRoutes = express_1.Router();
// Obtener items paginados
itemsRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const items = yield cItem_model_1.Item.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        items
    });
}));
// Crear ITEM
itemsRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    cItem_model_1.Item.create(body).then((itemDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield itemDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            item: itemDB
        });
    })).catch(err => {
        res.json(err);
    });
});
/*
// Servicio para subir archivos
postRoutes.post( '/upload', [ verificaToken ], async (req: any, res: Response) => {
    
    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });

});



postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img    = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img );

    res.sendFile( pathFoto );

});

*/
exports.default = itemsRoutes;
