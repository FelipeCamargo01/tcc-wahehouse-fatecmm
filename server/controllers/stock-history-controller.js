const { StockHistory, Product } = require('../../models/models');
// const StockHistory = require("../../models/stock-history");
// const Product = require('../../models/product');
const ResponseParse = require("../utils/response-parse");

class ProductController {
    static async createStockHistory(body) {
        await StockHistory.create({
            type: body.type,
            productId: body.productId,
            quantity: body.quantity,
            description: body.description
        });

        return ResponseParse.response("OK", 'Movimentação criada com sucesso!');
    }

    static async getStockHistory() {
        const suppliers = await StockHistory.findAll({raw : true, order: [
            ['createdAt', 'DESC']
        ], include: [
            { model: Product}
        ]});
        return ResponseParse.response("OK", suppliers);
    }
}

module.exports = ProductController;