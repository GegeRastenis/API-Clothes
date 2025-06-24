const express = require('express');

export const errorMiddleware = (err, req, res, next) => {
  console.error('Error: ', err.message);
  res.status(500).json({ error: 'Ocurrió un error en el servidor' });
};