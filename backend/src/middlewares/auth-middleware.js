const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = 'mi_clave_secreta'; // Usa variable de entorno en producción


const authMiddleware = (req, res, next) => {
// 1️⃣  Obtener token: cookie > header
  const cookieToken = req.cookies?.jwt;
  const header      = req.headers.authorization || '';
  const headerToken = header.startsWith('Bearer ') ? header.slice(7).trim() : null;
  const token       = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  // 2️⃣  Verificar firma / expiración
  let payload;
  try {
    payload = jwt.verify(token, secretKey);  // { email: '...' }
  } catch {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }

  // 3️⃣  Permitir solo al administrador
  if (payload.email !== 'admin@gmail.com') {
    return res.status(403).json({ mensaje: 'Acceso permitido solo al admin' });
  }

  // 4️⃣  Guardar datos útiles y continuar
  req.user = payload;
  next();
};



module.exports = authMiddleware;

