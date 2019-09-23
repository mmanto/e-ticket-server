"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const afipRoutes = express_1.Router();
// Login
afipRoutes.post('/login', (req, res) => {
    const body = req.body;
    const user = {
        cuit: body.cuit,
        password: body.password
    };
    // body.email body.password
    // Realiza consulta a afip sobre el usuario.
    if (true) {
        return res.json({
            ok: false,
            cuit: user.cuit,
            password: user.password
        });
    }
});
exports.default = afipRoutes;
