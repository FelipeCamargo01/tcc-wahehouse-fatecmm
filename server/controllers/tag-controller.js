const { Tag, Product, StockHistory } = require("../../models/models")
const ResponseParse = require("../utils/response-parse")
const moment = require("moment")

class TagController {
  static async createTag(body) {
    const product = await Product.findOne({ where: { SKU: body.sku } })
    if (!product) {
      return ResponseParse.response("Erro: Produto não encontrado!", body)
    }
    await Tag.create({
      id: body.id,
      product_sku: product.SKU,
    })
    return ResponseParse.response("Tag cadastrada", body)
  }

  static async getTag(tagId) {
    const tag = await Tag.findOne({ where: { id: tagId } })
    if (!tag) {
      return ResponseParse.response("Tag não encontrada", {})
    }
    return ResponseParse.response("Tag encontrada", tag)
  }

  static async getAllTags() {
    const tags = await Tag.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
    })
    let message = "Tags encontradas!"
    if (tags == false) {
      message = "Nenhuma tag existente!"
    }
    return ResponseParse.response(message, tags)
  }

  static async deleteTag(tagId) {
    const tag = await Tag.findOne({ where: { id: tagId } })
    if (!tag) {
      return ResponseParse.response("Tag não encontrada", {})
    }
    await Tag.destroy({ where: { id: tagId } })
    return ResponseParse.response("Tag excluída!", tag)
  }

  static async rfid(body) {
    const product = await Product.findOne({ where: { SKU: body.sku } })
    if (!product) {
      return ResponseParse.response("Erro: Produto não encontrado!", { SKU: body.sku })
    }
    const tag = await Tag.findOne({ where: { id: body.id } })
    let moveType
    if (tag) {
      moveType = "Saída"
      await Tag.destroy({ where: { id: body.id } })
    } else {
      moveType = "Entrada"
      await Tag.create({
        id: body.id,
        product_sku: product.SKU,
      })
    }
    const stockMov = await StockHistory.create({
      type: moveType,
      productId: body.sku,
      quantity: 1,
      actionDate: moment(new Date()),
    })

    return ResponseParse.response("Movimentação criada!", stockMov)
  }
}

module.exports = TagController
