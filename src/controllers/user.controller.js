const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { createUserModel } = require("../models/user.model");

exports.getUserController = async (req, res) => {
  res.status(204).send({});
};

exports.createUserController = async (req, res) => {
  const { name, email, password, phone_number } = req.body;
  const plan = 1;
  const goal = 2;
  try {
    const { code, message } = await createUserModel({
      name,
      email,
      password,
      phone_number,
      plan,
      goal,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editUserController = async (req, res) => {
  res.status(204).send({});
};

exports.deleteUserController = async (req, res) => {
  res.status(204).send({});
};
