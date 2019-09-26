"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const comprobanteSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    nombre: {
        type: String
    },
    tipo: {
        type: String
    },
    numero: {
        type: String
    },
    cuit: {
        type: String
    },
    importeTotal: {
        type: Number
    },
    items: [{
            created: {
                type: Date
            },
            concepto: {
                type: String
            },
            importe: {
                type: Number
            },
        }],
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
comprobanteSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Comprobante = mongoose_1.model('comprobante', comprobanteSchema);
