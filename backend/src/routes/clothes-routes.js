const express = require ('express'); 
const fs = require ('fs'); 
const path = require ('path'); 
const router = express.Router(); 

const filePath = path.join(__dirname, '../database/products.json'); 

router.get('/', (req, res)=>{
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
    res.json(products);

})

router.post('/', (req, res)=>{
    try {
        const { product, size } = req.body;
        const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id: newId, product, size };
        products.push(newProduct);
        fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
        res.json({ message: 'Product successfully added', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: 'Error adding product' });
    }
})

router.put('/:id', (req, res)=>{
    const {id}= req.params;
    const updatedProduct = req.body; 
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
    products = products.map(product =>(product.id === Number(id)? {...product, ...updatedProduct} : product)); 
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2)); 
    res.json({message: 'Product successfully updated', product: updatedProduct}); 

})

router.delete('/:id', (req, res)=>{
    const{id}= req.params; 
    let products = JSON.parse(fs.readFileSync(filePath, 'utf-8')); 
    products = products.filter(product =>product.id !== Number (id)); 
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2)); 
    res.json({message: 'Product deleted'})
})

module.exports = router; 