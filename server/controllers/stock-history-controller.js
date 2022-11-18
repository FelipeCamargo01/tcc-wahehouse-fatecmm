const { StockHistory, Product } = require('../../models/models');
const ResponseParse = require("../utils/response-parse");
const { Op } = require("sequelize");
const momentUtil = require('../utils/moment');
const moment = require('moment');

class ProductController {
    static async createStockHistory(body) {
        const product = await Product.findOne({raw: true},{ where: { SKU: body.SKU } });
        if(!product) throw new Error('Produto não encontrado');

        let movimentationType = '';
        let movimentationDate = body.actionDate ? body.actionDate : moment().format('YYYY-MM-DD HH:mm:ss');
        //
        if(body.type === 0) {
            movimentationType = 'Saída';
        }
        else if(body.type === 1) {
            movimentationType = 'Entrada';
        }

        await StockHistory.create({
            type: movimentationType,
            productId: product.SKU,
            quantity: body.quantity,
            actionDate: movimentationDate
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