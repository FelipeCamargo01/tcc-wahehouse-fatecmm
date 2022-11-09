const { User } = require("../../models/models");
const ResponseParse = require("../utils/response-parse");

class UserController {
    static async verifyIfUserIsAdmin(body) {
        const user = await User.findOne({raw: true, where: {id: body.id}});
        return (user.role === 'admin');
    }
}

module.exports = UserController;