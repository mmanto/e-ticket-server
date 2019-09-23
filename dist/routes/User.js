"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes = express_1.Router();
// Login
userRoutes.post('/login2', (req, res) => {
    const body = req.body;
    const user = {
        email: body.email,
        password: body.password
    };
    // body.email body.password
    // Realiza consulta a afip sobre el usuario.
    if (true) {
        return res.json({
            ok: false,
            email: user.email,
            password: user.password
        });
    }
});
