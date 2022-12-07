const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { createSubcategoryModel } = require("../models/subcategory.model");
const { getUserBySessionGuid } = require("../models/user.model");

exports.createSubcategoryController = async (req, res) => {
  const { transaction_type, category, name, costing } = req.body;
  const { session_guid } = req.headers;
  const { user_id } = await getUserBySessionGuid({ session_guid });

  if (!user_id) {
    const code = httpCode.UNAUTHORIZED;
    const message = httpMessage.UNAUTHORIZED;
    res.status(code).send({ code, message });
  }

  try {
    const { code, message } = await createSubcategoryModel({
      transaction_type,
      category,
      name,
      costing,
      user_id,
    });
    res.status(code).send({ code, message });
  } catch {
    res
      .status(httpCode.ERROR)
      .send({ code: httpCode.ERROR, message: httpMessage.ERROR });
  }
};

exports.editSubcategoryController = async (req, res) => {
  res.status(204).send({});
};

exports.deleteSubcategoryController = async (req, res) => {
  res.status(204).send({});
};
