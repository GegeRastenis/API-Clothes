const express = require('express');

const validateMiddleware = (req, res, next) => {
    const { name, size, price, image } = req.body;

    if (!name || typeof name !== 'string') {
        res.status(400).json({ error: "El campo 'name' es requerido y debe ser string" });
        return;
    }

    if (!size || typeof size !== 'string') {
        res.status(400).json({ error: "El campo 'size' es requerido y debe ser string" });
        return;
    }

    if(!price || price === undefined || typeof price != 'number'){
        return res.status(400).json({error: "El campo 'price' es requerido y deber ser un numero"})
    }
    
    if(!image || typeof image != 'string'){
        return res.status(400).json({error: "El campo 'image' debe ser un string"})
    }

    next();
};
module.exports = { validateMiddleware };
