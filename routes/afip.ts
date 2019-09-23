import { Router, Request, Response } from 'express';



const afipRoutes = Router();


// Login
afipRoutes.post('/login', (req: Request, res: Response ) => {

    const body = req.body;

    const user = {
        cuit : body.cuit,
        password : body.password
    }
    // body.email body.password

    // Realiza consulta a afip sobre el usuario.
    if ( true ) {
        return res.json({
            ok: false,
            cuit: user.cuit,
            password: user.password
        });
    }

   
    });

export default afipRoutes;