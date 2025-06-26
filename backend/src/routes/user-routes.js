// 3. Seguridad y Validaciones (3
// puntos)
// Implementar middleware para:
// 1. Validar tokens de autenticación.
// 2. Manejar errores y solicitudes malformadas.
// 3. Hacer que las consultas sean case insensitive para facilitar
// su uso.
const express = require ('express'); 
const fs = require ('fs'); 
const bcrypt = require('bcrypt');
const path = require('path');
const usersRouter = express.Router(); 
const jwt = require('jsonwebtoken');
const secretKey = 'mi_clave_secreta';

const userDatabaseFilePath = path.join(__dirname, '../database/users.json');

// • POST /users/register: Registra usuarios con contraseñas hasheadas.
usersRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const usersData = JSON.parse(fs.readFileSync(userDatabaseFilePath, 'utf-8'));
    const userExists = usersData.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashedPassword };

    usersData.push(newUser);
    fs.writeFileSync(userDatabaseFilePath, JSON.stringify(usersData, null, 2));

    res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// • POST /users/login: Devuelve un token de autenticación al iniciar
// sesión correctamente.
usersRouter.post('/login', async (req, res) => {
    console.log('LOGIN');
    const { email, password } = req.body;
    const usersData = JSON.parse(fs.readFileSync(userDatabaseFilePath, 'utf-8'));
    const user = usersData.find((u) => u.email === email);

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });

})
//TODO: HACER EN MIDDLEWARE
function authToken(req, res, next){

}

module.exports = usersRouter;