import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import afipRoutes from './routes/afip';

import cors from 'cors';
import itemsRoutes from './routes/citem';
import comprobanteRoutes from './routes/comprobante';

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );


// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

// Configurar CORS
server.app.use( cors({origin:true, credentials:true}) );


// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes );
server.app.use('/afip', afipRoutes );
server.app.use('/items', itemsRoutes );
server.app.use('/comprobante', comprobanteRoutes );
server.app.use('/comprobante/:id', comprobanteRoutes );


// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', 
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

   if ( err ) throw err;

   console.log('Base de datos ONLINE');
})

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});