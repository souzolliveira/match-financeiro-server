const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const {
  createCategoryModel,
  listCategoryModel,
} = require("../models/category.model");
const { getUserBySessionGuid } = require("../models/user.model");

exports.listCategoryController = async (req, res) => {
  const { transaction_type } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
  }

  try {
    const { code, message, data } = await listCategoryModel({
      transaction_type,
      user_id,
    });
    res.status(code).send({ code, message, data });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.createCategoryController = async (req, res) => {
  const { transaction_type, name } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
  }

  try {
    const { code, message } = await createCategoryModel({
      transaction_type,
      name,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editCategoryController = async (req, res) => {
  res.status(204).send({});
};

exports.deleteCategoryController = async (req, res) => {
  res.status(204).send({});
};
