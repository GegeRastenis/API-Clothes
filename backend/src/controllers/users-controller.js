//Se encarga de las rutas de el inicio de sesion y registro de usuarios
const jwt = require('jsonwebtoken');
const secretKey = 'mi_clave_secreta';
const bcrypt = require('bcrypt');
const { getAllUsers, saveUsers, getUserByEmail } = require('../models/users-model');

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const usersData = getAllUsers();
  const userExists = usersData.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'El usuario ya está registrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), name, email, password: hashedPassword };

  usersData.push(newUser);
  saveUsers(usersData);

  res.status(201).json({ message: 'Usuario registrado con éxito' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

  // Si es el admin, ponemos cookie y devolvemos token en la MISMA respuesta
  if (email === 'admin@gmail.com') {
    return res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'lax',      // usa 'none' + secure con HTTPS/dom. distintos
        maxAge: 60 * 60 * 1000
      })
      .json({ message: 'Inicio de sesión exitoso', token });
  }

  // Resto de usuarios
  return res.json({ message: 'Inicio de sesión exitoso', token });
};

module.exports = { registerUser, loginUser };