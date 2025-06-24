const { ProductsModel } = require('../models/clothes-models');


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
    res.status(200).json(updatedProduct);
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const isDeleted = ProductsModel.deleteProduct(id);

    if (!isDeleted) {
        res.status(404).json({ error: 'Producto no encontrado para ser borrada' });
        return;
    }

    res.status(204).send();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
