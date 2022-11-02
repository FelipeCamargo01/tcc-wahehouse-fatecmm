const { Supplier, Product } = require("../../models/models");
const ResponseParse = require("../utils/response-parse");

class SupplierController {
    static async createSupplier(body) {
        await Supplier.create({
            email: body.email,
            address: body.address,
            name: body.name,
            phone: body.phone,
            cnpj: body.cnpj,
            corporateName: body.corporateName,
            fantasyName: body.fantasyName,
            cep: body.cep,
            addressNumber: body.addressNumber
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
        await Product.destroy({where: {supplierId: body.id}});
        await Supplier.destroy({where: {id: body.id}});

        return ResponseParse.response('OK', "Fornecedor deletado com sucesso!");
    }
    
    static async updateSupplier(body) {
        console.log(body);
        await Supplier.update(
            {
                email: body.email,
                address: body.address,
                name: body.name,
                phone: body.phone,
                cnpj: body.cnpj,
                corporateName: body.corporateName,
                fantasyName: body.fantasyName,
                cep: body.cep,
                addressNumber: body.addressNumber
            },
            {
                where: {
                    id: body.id
                }
            }
        );

        return ResponseParse.response("OK", 'Fornecedor atualizado com sucesso!');
    }
}

module.exports = SupplierController;