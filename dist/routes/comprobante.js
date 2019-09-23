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
const comprobante_model_1 = require("../models/comprobante.model");
const comprobantesRoutes = express_1.Router();
comprobantesRoutes.route('/:id')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const comprobanteid = req.params.id;
        const comprobante = yield comprobante_model_1.Comprobante.findById(comprobanteid)
            .populate('usuario', '-password')
            .exec();
        res.json({
            ok: true,
            comprobante
        });
    });
});
// Obtener Comprobantes paginados
comprobantesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const comprobante = yield comprobante_model_1.Comprobante.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        comprobante
    });
}));
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
comprobantesRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    comprobante_model_1.Comprobante.create(body).then((comprobanteDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield comprobanteDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            comprobante: comprobanteDB
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = comprobantesRoutes;
