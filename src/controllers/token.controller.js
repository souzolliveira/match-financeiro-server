const db = require("../config/database");

exports.createToken = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};

exports.confirmToken = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};

exports.validToken = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};

exports.deleteToken = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};

/**
 * crio o token quando eu peço para confirmar o email ou o telefone, ou quando faço login
 * confirmo o token de confirmação de email ou telefone
 * valido o token toda vez que faço uma requisição
 * delete o token quando expira, quando deslogo, ou quando confirmo email ou telefone
 */
