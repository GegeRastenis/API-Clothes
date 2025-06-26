const express = require('express');

const validateMiddleware = (req, res, next) => {
    const { product, size } = req.body;

    if (!product || typeof product !== 'string') {
        res.status(400).json({ error: "El campo 'product' es requerido y debe ser string" });
        return;
    }

    if (!size || typeof size !== 'string') {
        res.status(400).json({ error: "El campo 'size' es requerido y debe ser string" });
        return;
    }

    next();
};
module.exports = { validateMiddleware };
