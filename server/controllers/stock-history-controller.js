const { StockHistory, Product } = require('../../models/models');
const ResponseParse = require("../utils/response-parse");
const { Op } = require("sequelize");
const momentUtil = require('../utils/moment');
const moment = require('moment');

class ProductController {
    static async createStockHistory(body) {
        const product = await Product.findOne({raw: true},{ where: { rfId: body.rfId } });
        if(!product) throw new Error('Produto não encontrado');

        await StockHistory.create({
            type: body.type,
            productId: product.SKU,
            quantity: body.quantity,
            actionDate: moment(body.actionDate).format('YYYY-MM-DD HH:mm:ss')
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

    static async getStockHistoryPerWeek() {
        let data = [
            {
                label: 'Segunda',
                input: 0,
                output: 0
            },
            {
                label: 'Terça',
                input: 0,
                output: 0
            },
            {
                label: 'Quarta',
                input: 0,
                output: 0
            },
            {
                label: 'Quinta',
                input: 0,
                output: 0
            },
            {
                label: 'Sexta',
                input: 0,
                output: 0
            },
            {
                label: 'Sábado',
                input: 0,
                output: 0
            },
            {
                label: 'Domingo',
                input: 0,
                output: 0
            }
        ];

        const stockHistory = await StockHistory.findAll({raw : true, order: [
            ['createdAt', 'DESC']
        ], include: [
            { model: Product}
        ]}, { where: { [Op.and]: [
            { createdAt: { [Op.gte]: momentUtil.getMondayDayOfWeek() } },
            { createdAt: { [Op.lte]: momentUtil.getSundayDayOfWeek() } }
        ] } });

        for(let i = 0; i < stockHistory.length; i++) {
            let day = stockHistory[i].actionDate.getDay();
            if(stockHistory[i].type === 'Entrada') {
                data[day].input += stockHistory[i].quantity;
            } else if(stockHistory[i].type === 'Saída') {
                data[day].output += stockHistory[i].quantity;
            }
        }

        return ResponseParse.response("OK", data);
    }
}

module.exports = ProductController;