const { User } = require('../../models/models');
const APIError = require('../utils/api-error');

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            throw new APIError('Já existe um usuário cadastrado com esse email!', APIError.EMAIL_ALREADY_EXIST);
        }

        next();
    }).catch(err => {
        next(err);
    })
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp;