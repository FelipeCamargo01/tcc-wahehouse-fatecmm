const { StockHistory, Product } = require("../../models/models")
const ResponseParse = require("../utils/response-parse")
const { Op } = require("sequelize")
const momentUtil = require("../utils/moment")
const moment = require("moment")
moment.tz.setDefault("America/Sao_Paulo")

class StockHistoryController {
  static async createStockHistory(body) {
    const product = await Product.findOne({ where: { SKU: body.sku } })
    if (!product) {
      return ResponseParse.response("Produto não encontrado", body.sku)
    }

    const stockHistory = await StockHistory.create({
      type: body.type,
      productId: product.SKU,
      quantity: body.quantity,
      actionDate: moment(),
    })
    return ResponseParse.response("Movimentação criada com sucesso", stockHistory)
  }

  static async getStockHistory() {
    const suppliers = await StockHistory.findAll({
      raw: true,
      order: [["actionDate", "DESC"]],
      include: [{ model: Product }],
    })
    return ResponseParse.response("OK", suppliers)
  }

  static async getStockHistoryPerWeek() {
    let data = [
      {
        label: "Domingo",
        input: 0,
        output: 0,
      },
      {
        label: "Segunda",
        input: 0,
        output: 0,
      },
      {
        label: "Terça",
        input: 0,
        output: 0,
      },
      {
        label: "Quarta",
        input: 0,
        output: 0,
      },
      {
        label: "Quinta",
        input: 0,
        output: 0,
      },
      {
        label: "Sexta",
        input: 0,
        output: 0,
      },
      {
        label: "Sábado",
        input: 0,
        output: 0,
      },
    ]

    const stockHistory = await StockHistory.findAll(
      { raw: true, order: [["actionDate", "DESC"]], include: [{ model: Product }] },
      {
        where: {
          [Op.and]: [
            { actionDate: { [Op.gte]: momentUtil.getMondayDayOfWeek() } },
            { actionDate: { [Op.lte]: momentUtil.getSundayDayOfWeek() } },
          ],
        },
      }
    )

    for (let i = 0; i < stockHistory.length; i++) {
      const day = moment(stockHistory[i].actionDate).day()
      if (stockHistory[i].type === "Entrada") {
        data[day].input += stockHistory[i].quantity
      } else if (stockHistory[i].type === "Saída") {
        data[day].output += stockHistory[i].quantity
      }
    }

    return ResponseParse.response("OK", data)
  }
}

module.exports = StockHistoryController
