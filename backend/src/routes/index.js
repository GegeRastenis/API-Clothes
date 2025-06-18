const express = require ('express'); 
const cors = require ('cors'); 
const path = require ('path'); 
const clothesRoutes = require ('./routes/clothes-routes'); 


const app = express(); 
const PORT = 3000; 

app.use(cors()); 

app.use(express.static(path.join(__dirname, '../public'))); 

app.use('/api/clothes', clothesRoutes); 

app.get('/', (res, req)=>{
    res.sendfile(path.join(__dirname, '../public/index/html'))
})

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
    
})