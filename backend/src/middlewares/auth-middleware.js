const express = require('express');

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer my-secret-token') {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }
  next();
};