const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { actions } = require("../enumerations/actions.enumeration");
const {
  createTransactionModel,
  listTransactionsModel,
} = require("../models/transaction.model");
const { getUserBySessionGuid } = require("../models/user.model");

exports.listTransactionsController = async (req, res) => {
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
  }

  try {
    const { code, message, data } = await listTransactionsModel({
      user_id,
    });
    res.status(code).send({ code, message, data });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.createTransactionController = async (req, res) => {
  const {
    transaction_type,
    category,
    subcategory,
    transaction_date,
    value,
    observation,
  } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
  }

  try {
    const { code, message } = await createTransactionModel({
      transaction_type,
      category,
      subcategory,
      action: actions.USER,
      transaction_date,
      value,
      observation,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editTransactionController = async (req, res) => {
  res.status(204).send({});
};

exports.deleteTransactionController = async (req, res) => {
  res.status(204).send({});
};
