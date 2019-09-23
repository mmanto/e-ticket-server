import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Item } from '../models/cItem.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';


const itemsRoutes = Router();


// Obtener items paginados
itemsRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const items = await Item.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();


    res.json({
        ok: true,
        pagina,
        items
    });


});



// Crear ITEM
itemsRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {

    const body = req.body;
    
    body.usuario = req.usuario._id;

    Item.create( body ).then( async itemDB => {

        await itemDB.populate('usuario', '-password').execPopulate();

        res.json({
            ok: true,
            item: itemDB
        });

    }).catch( err => {
        res.json(err)
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


export default itemsRoutes;