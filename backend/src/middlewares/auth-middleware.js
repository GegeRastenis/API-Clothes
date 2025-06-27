const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = 'mi_clave_secreta'; // Usa variable de entorno en producción

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secretKey);
       // Validamos que sea el correo del administrador
    if (decoded.email !== 'admin@gmail.com') {
      return res.status(403).json({ error: 'Acceso restringido: solo administradores' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};



module.exports = authMiddleware;

