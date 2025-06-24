// 3. Seguridad y Validaciones (3
// puntos)
// Implementar middleware para:
// 1. Validar tokens de autenticación.
// 2. Manejar errores y solicitudes malformadas.
// 3. Hacer que las consultas sean case insensitive para facilitar
// su uso.
const express = require ('express'); 
const fs = require ('fs'); 
const path = require('path');
const userRouter = express.Router(); 

const userDatabaseFilePath = path.join(__dirname, '../database/users.json');

// • POST /users/register: Registra usuarios con contraseñas hasheadas.
//TODO: QUITAR EL USERS DEL ENDPOINT
userRouter.post('/users/register', async(req, res) => {
    //Obtenemos el email y contasena del cuerpo de la solicitud
    const {email, password} = req.body; 

    //Verificamos que los campos no estén vacios
    if(!email || !password){
        return res.status(400).json({error: 'El usuario no ingresó los campos requeridos (email o password)'});
    }

    //Leemos la base de datos de usuarios para verificar si existe
    const usersData = JSON.parse(fs.readFileSync(userDatabaseFilePath, 'utf-8'));

    //Buscamos al usuario por email
    const userExists = usersData.find((user) => user.email === email);
    //Mandamos una respuesta en caso de que el usuario ya exista
    if(userExists){
        return res.status(400).json({error: 'El usuario ya está registrado'});
    }
})

// • POST /users/login: Devuelve un token de autenticación al iniciar
// sesión correctamente.
userRouter.post('/users/login', async (req, res) => {

})
//TODO: HACER EN MIDDLEWARE
function authToken(req, res, next){

}

module.exports = userRouter;