const { Product, Supplier, StockHistory } = require('../../models/models');
// const Product = require("../../models/product");
// const Supplier = require("../../models/supplier");
// const StockHistory = require("../../models/stock-history");
const sequelize = require('sequelize');
const ResponseParse = require("../utils/response-parse");
const { Op } = require("sequelize");

class ProductController {
    static async createProduct(body) {
        await Product.create({
            name: body.name,
            SKU: body.SKU,
            price: body.price,
            supplierId: body.supplierId,
            productImage: body.productImage
        });

        return ResponseParse.response("OK", 'Produto criado com sucesso!');
    }

    static async getProducts() {
        const products = await Product.findAll({raw : true, order: [
            ['createdAt', 'DESC']
        ], include: [
            { model: Supplier }
        ]});
        return ResponseParse.response("OK", products);
    }

    static async deleteProduct(body) {
        await StockHistory.destroy({ where: { productId: body.productId } });
        await Product.destroy({where: {Id: body.productId}});

        return ResponseParse.response('OK', "Produto deletado com sucesso!");
    }

    static async getProductInfos() {
        const productMap = new Map();
        const products = await Product.findAll({raw : true, order: [
            ['createdAt', 'DESC']
        ]});

        for(const product of products) {
            console.log(product);
            productMap.set(product.id, product);
            productMap.get(product.id).quantity = 0;
        }

        const stockMovimentationOutput = await StockHistory.findAll({ raw: true, 
            attributes: [
                'productId',
                [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']
            ],
            group: ['productId'],
            where: {
            [Op.and]: [
                { productId: [...productMap.keys()] },
                { type: 'Saída' }
            ]
        } });

        const stockMovimentationInput = await StockHistory.findAll({ raw: true, 
            attributes: [
                'productId',
                [sequelize.fn('sum', sequelize.col('quantity')), 'totalQuantity']
            ],
            group: ['productId'],
            where: {
            [Op.and]: [
                { productId:[...productMap.keys()] },
                { type: 'Entrada' }
            ]
        } });

        console.log(stockMovimentationOutput);
        console.log(stockMovimentationInput);

        for(const stockMovimentation of stockMovimentationOutput) {
            console.log(stockMovimentation.totalQuantity);
            productMap.get(stockMovimentation.productId).quantity -= parseInt(stockMovimentation.totalQuantity);
        }
        for(const stockMovimentation of stockMovimentationInput) {
            console.log(stockMovimentation.totalQuantity);
            productMap.get(stockMovimentation.productId).quantity += parseInt(stockMovimentation.totalQuantity);
        }

        console.log(productMap);

        return ResponseParse.response("OK", [...productMap.values()]);
    }
}

module.exports = ProductController;