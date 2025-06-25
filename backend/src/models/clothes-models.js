const fs = require('fs');
const path = require('path');

const clothesFilePath = path.join(__dirname, '../database/products.json');

class ProductsModel{

    static readDatabase(){
        try{
            const data = JSON.parse(fs.readFileSync(clothesFilePath, 'utf-8'));
            return data;
        } catch(error){
            console.error({message: error})
        }
    }
    
    static writeDatabase(data){
        try{
            const jsonData = JSON.stringify(data,null,2);
            fs.writeFileSync(clothesFilePath, jsonData, 'utf-8');
        } catch(error){
            console.error({message: error})
        }
    }
    
    static getAllProducts(){
        const products = this.readDatabase();
        
        if(products && Array.isArray(products)){
            return products;
        } else {
            console.error('El formato del archivo no es valido json');
            return [];
        }
    }

    static getProductById(id){
        const products = this.readDatabase();

        if (products && Array.isArray(products)) {
            return products.find(product => parseInt(product.id) === parseInt(id)) || null;
        }
        return null;
    }

    static createProduct(productData){
        const products = this.readDatabase();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1; 
        const newProduct = {id: newId, ...productData};
        products.push(newProduct);
        this.writeDatabase(products);
        return newProduct;
    }

    static updateProduct(id, productData){
        const products = this.readDatabase();
        const productIndex = products.findIndex(product => parseInt(product.id) === parseInt(id));
        if(productIndex === -1) return null;

        //Se combinan dos objetos, crea un nuevo objeto updatedProduct, toma las propiedades del producto original y 
        // sobreescribe cualquier propiedad que exista en updatedData 
        const updatedProduct = {...products[productIndex], ...productData};
        products[productIndex] = updatedProduct;
        this.writeDatabase(products);
        return updatedProduct; 
    }

    static deleteProduct(id){
        let products = this.readDatabase();
        const newProducts = products.filter(product => product.id != parseInt(id));

        if (newProducts.length === products.length) return false;
        this.writeDatabase(newProducts);
        return true;
    }
} 

module.exports = ProductsModel