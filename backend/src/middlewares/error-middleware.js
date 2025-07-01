//Maneja errores
const express = require('express');

const errorMiddleware = (err, req, res, next) => {
  console.error('Error: ', err.message);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
};

module.exports = { errorMiddleware };