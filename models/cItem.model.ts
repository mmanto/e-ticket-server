
import { Schema, Document, model } from 'mongoose';

const itemSchema = new Schema({

    created: {
        type: Date
    },
    
    concepto: {
        type: String
    },
    
    importe: {
        type: Number   
    },
    
    comprobante : { 
        type: Schema.Types.ObjectId,
        ref: 'Comprobante',
        required: ['Debe existir una referencia a un comprobante.']
     },
    
     usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
    
});

itemSchema.pre<IItem>('save', function( next ) {
    this.created = new Date();
    next();
});

interface IItem extends Document {
    created: Date;
    concepto: string;
    importe : number;
    comprobante : Schema.Types.ObjectId;
    usuario: string;
}

export const Item = model<IItem>('Item', itemSchema);
