"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    concepto: {
        type: String
    },
    importe: {
        type: Number
    },
    comprobante: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comprobante',
        required: ['Debe existir una referencia a un comprobante.']
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
itemSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Item = mongoose_1.model('Item', itemSchema);
