//Instalamos dependencias
const express = require ('express'); 
const cors = require ('cors'); 
const path = require ('path'); 
const clothesRoutes = require ('./routes/clothes-routes');
const usersRouter = require('./routes/user-routes');
const authMiddleware = require('./middlewares/auth-middleware');
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv'); 
dotenv.config(); 

//Instanciamos app de express
const app = express(); 
//Se asigna el puerto
const PORT = process.env.PORT || 3000; 

//Middlewares
app.use(express.json()); 
app.use(cors()); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public'))); 

//Se definen rutas
app.use('/api/clothes', clothesRoutes); 
app.use('/api/users', usersRouter)
//En la ruta http://localhost:3000/ se mostrará la pagina principal de la tienda
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})
//En la ruta http://localhost:3000/login se mostrará la pagina con el inicio de sesion y registro
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/inicio.html'))
})

app.get('/admin',authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../private/admin.html'));
});

//Se llama el servidor
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`Servidor escuchando en: http://localhost:${PORT}/api/clothes`);
    console.log(`Servidor escuchando en: http://localhost:${PORT}/api/users`);
})