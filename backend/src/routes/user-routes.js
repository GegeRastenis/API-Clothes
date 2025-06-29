// 3. Seguridad y Validaciones (3
// puntos)
// Implementar middleware para:
// 1. Validar tokens de autenticación.
// 2. Manejar errores y solicitudes malformadas.
// 3. Hacer que las consultas sean case insensitive para facilitar
// su uso.
const express = require ('express'); 
const usersRouter = express.Router(); 
const authMiddleware = require('../middlewares/auth-middleware');
const { registerUser, loginUser } = require('../controllers/users-controller');
const path = require ('path');



// • POST /users/register: Registra usuarios con contraseñas hasheadas.
usersRouter.post('/register', registerUser);

// • POST /users/login: Devuelve un token de autenticación al iniciar
// sesión correctamente.
usersRouter.post('/login', loginUser);



//TODO: HACER EN MIDDLEWARE
function authToken(req, res, next){

}

module.exports = usersRouter;