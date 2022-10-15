const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../../models/user');

const APIError = require('../utils/api-error');
const Errors = require('../utils/errors');

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        throw new APIError('Nenhum token foi encontrado!', Errors.TOKEN_NOT_PROVIDED);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            throw new APIError('Usuário não autenticado!', Errors.NOT_AUTHENTICATED);
        }
        req.userId = decoded.id;
        next();
    })
}

const authJwt = {
    verifyToken: verifyToken
}