const { Supplier, Product } = require("../../models/models");
const ResponseParse = require("../utils/response-parse");

class SupplierController {
    static async createSupplier(body) {
        await Supplier.create({
            email: body.email,
            address: body.address,
            name: body.name,
            phone: body.phone
        });

        return ResponseParse.response("OK", 'Fornecedor criado com sucesso!');
    }

    static async getSuppliers() {
        const suppliers = await Supplier.findAll({raw : true, order: [
            ['createdAt', 'DESC']
        ]});
        return ResponseParse.response("OK", suppliers);
    }

    static async deleteSupplier(body) {
        await Product.destroy({where: {supplierId: body.supplierId}});
        await Supplier.destroy({where: {Id: body.supplierId}});

        return ResponseParse.response('OK', "Fornecedor deletado com sucesso!");
    }
}

module.exports = SupplierController;