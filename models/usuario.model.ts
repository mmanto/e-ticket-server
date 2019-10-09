
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { StringifyOptions } from 'querystring';


const usuarioSchema = new Schema({


    nombre: { // Razón social
        type: String,
        required: [true, 'El nombre es necesario']
    },

    domicilioCalle: {
        type: String,
        required: [true, 'El domicilio es necesario']
    },

    domicilioNumero: {
        type: String,
    },

    domicilioLocalidad: {
        type: String,
        required: [true, 'La localidad es requerida.']
    },

    domicilioProvincia: {
        type: String,
        required: [true, 'La provincia es requerida.']  
    },

    cuit: {
        type: String,
        required: [true, 'El CUIT es necesario']
    },

    iibb: {
        type: String,
        required: [true, 'IIBB es necesario']
    },

    inicioActividad: {
        type: Date,
        required: [true, 'Inicio de actividades es necesario']
    },

    respAnteIva: {
        type: String,
        required: [true, 'Responsabilidad ante IVA es necesario']
    },

    email: {
        type: String,
    },

    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }

});


usuarioSchema.method('compararPassword', function (password: string = ''): boolean {


    if (bcrypt.compareSync(password, this.password)) {

        return true;

    } else {

        return false;
    }

});



interface IUsuario extends Document {

    nombre: string;

    cuit: string;

    domicilioCalle: string;

    domicilioNumero: string;

    domicilioLocalidad: string;

    domicilioProvincia: String;

    iibb: string;

    inicioActividad: Date;

    respAnteIva: string;

    email: string;

    password: string;

    compararPassword(password: string): boolean;
}



export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
