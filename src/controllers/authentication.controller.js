const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { signInModel } = require("../models/authentication.model");

exports.signInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { code, message, session_guid } = await signInModel({
      email,
      password,
    });
    if (session_guid) {
      res.status(code).send({ code, message, session_guid });
    } else {
      res.status(code).send({ code, message });
    }
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.signOutController = async (req, res) => {
  res.status(204).send({});
};
