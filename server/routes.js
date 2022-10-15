const express = require('express');
const router = express.Router();

const SupplierController = require('./controllers/supplier-controller');
const ProductController = require('./controllers/product-controller');
const StockHistoryController = require('./controllers/stock-history-controller');
//POST

//SUPPLIER
router.post('/create-supplier', async function (req, res, next) {
    try {
        const response = await SupplierController.createSupplier(req.body);
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
router.post('/get-suppliers', async function (req, res, next) {
    try {
        const response =  await SupplierController.getSuppliers();
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
router.post('/delete-supplier', async function (req, res, next) {
    try {
        const response = await SupplierController.deleteSupplier(req.body);
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
//PRODUCT
router.post('/create-product', async function (req, res, next) {
    try {
        const response = await ProductController.createProduct(req.body);
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
router.post('/get-products', async function (req, res, next) {
    try {
        const response = await ProductController.getProducts();
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
router.post('/get-product-infos', async function (req, res, next) {
    try {
        const response = await ProductController.getProductInfos();
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
router.post('/delete-product', async function (req, res, next) {
    try {
        const response = await ProductController.deleteProduct(req.body);
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
//STOCK HISTORY
router.post('/create-stock-history', async function (req, res, next) {
    try {
        const response = await StockHistoryController.createStockHistory(req.body);
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})
router.post('/get-stock-history', async function (req, res, next) {
    try {
        const response = await StockHistoryController.getStockHistory();
        res.status(200);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
})

module.exports = router;