const { User } = require("../../models/models");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const APIError = require("../utils/api-error");
const ResponseParse = require("../utils/response-parse");
const Errors = require("../utils/errors");

class AuthController {
  static signUp(req, res, next) {
    User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "9999 years",
        });

        res.status(200).send(ResponseParse.response("OK", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accessToken: token,
        }));
      })
      .catch((err) => {
        throw new APIError(err.message);
      })
      .catch((err) => {
        next(err);
      });
  }

  static signIn(req, res, next) {
    if (!req.body.email) throw new APIError("Email não foi preenchido!");
    if (!req.body.password) throw new APIError("Senha não foi preenchida!");

    User.findOne({
      raw: true,
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          throw new APIError("Usuário não encontrado", Errors.USER_NOT_FOUND);
        }


        console.log('returned User');
        console.log(user);
        console.log(req.body);

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          throw new APIError("Senha inválida!", Errors.INVALID_PASSWORD);
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "9999 years",
        });

        res.status(200).send(
          ResponseParse.response("OK", {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: token,
          })
        );
      })
      .catch((error) => {
        next(error);
      });
  }
}

module.exports = AuthController;
