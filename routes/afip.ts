import { Router, Request, Response } from 'express';
import { Afip } from '../classes/afip';



const afipRoutes = Router();

const afip = new Afip;


// Login
afipRoutes.post('/login', (req: Request, res: Response ) => {

    const body = req.body;

    const user = {
        cuit : body.cuit,
        password : body.password
    }
    // body.email body.password

    // Realiza consulta a afip sobre el usuario.
    afip.obLoginTicket();

});

    /*
    if ( true ) {
        return res.json({
            ok: false,
            datos: afip.obTiposComprobantes(),
            cuit: user.cuit,
            password: user.password
        });
        
    }
*/
   
    
    

export default afipRoutes;