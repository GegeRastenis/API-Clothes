const express = require ('express'); 
const cors = require ('cors'); 
const path = require ('path'); 
const clothesRoutes = require ('./routes/clothes-routes');
const usersRouter = require('./routes/user-routes');
//const dotenv = require('dotenv'); 

//dotenv.config(); 

const app = express(); 
const PORT = 3000; 

app.use(express.json()); 

app.use(cors()); 

app.use(express.static(path.join(__dirname, '../public'))); 

app.use('/api/clothes', clothesRoutes); 
app.use('/api/users', usersRouter)

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

app.listen(PORT, ()=>{

    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`Servidor escuchando en: http://localhost:${PORT}/api/clothes`);
    console.log(`Servidor escuchando en: http://localhost:${PORT}/api/users`);
})