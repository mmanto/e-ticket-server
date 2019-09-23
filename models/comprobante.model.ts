
import { Schema, Document, model } from 'mongoose';

const comprobanteSchema = new Schema({

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
    items : [{ type: Schema.Types.ObjectId, ref: 'Items' }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
});

comprobanteSchema.pre<IComprobante>('save', function( next ) {
    this.created = new Date();
    next();
});

interface IComprobante extends Document {
    created: Date;
    nombre: string;
    tipo : number;
    cuit : string;
    numero : string;
    importeTotal : number;
    items : [Schema.Types.ObjectId];
    usuario: string;
}

export const Comprobante = model<IComprobante>('comprobante', comprobanteSchema);
