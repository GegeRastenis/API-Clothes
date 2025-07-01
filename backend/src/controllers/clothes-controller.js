//Se encarga de manejar todo lo referente al modelo y el routes
const ProductsModel = require('../models/clothes-models');


const getAllProducts = (req, res) => {
    const products = ProductsModel.getAllProducts();
    res.json(products);
};


const getProductById = (req, res) => {
    const { id } = req.params;
    const product = ProductsModel.getProductById(id);

    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }
    res.json(product);
};

const createProduct = (req, res) => {
    const newProduct = ProductsModel.createProduct(req.body);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const updatedProduct = ProductsModel.updateProduct(id, req.body);
    if(!updatedProduct){
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({message: 'Producto actualizado', product: updatedProduct});
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const isDeleted = ProductsModel.deleteProduct(id);

    if (!isDeleted) {
        return res.status(404).json({ error: 'Producto no encontrado para ser borrado' });
    } else {
        return res.status(200).json({message: `Producto con id ${id}, eliminado`});
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
