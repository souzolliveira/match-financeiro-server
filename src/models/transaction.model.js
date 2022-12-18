const { selectCategory } = require("../dao/category.dao");
const { selectSubcategoryByNameDAO } = require("../dao/subcategory.dao");
const { insertTransactionDAO } = require("../dao/transaction.dao");
const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { now } = require("./helpers/now");

exports.createTransactionModel = async ({
  transaction_type,
  category,
  subcategory,
  action,
  transaction_date,
  value,
  observation,
  user_id,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  const date = now();

  if (!transaction_type) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o tipo de transação";
    return { code, message };
  }

  if (!category) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a categoria";
    return { code, message };
  }

  const verifyCategoryName = await selectCategory({
    transaction_type,
    name: category,
    user_id,
  });
  if (verifyCategoryName.rows.length === 0) {
    code = httpCode.BAD_REQUEST;
    message = `Não existe uma categoria com esse nome: ${category}`;
    return { code, message };
  }

  if (!subcategory) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a subcategoria";
    return { code, message };
  }

  const verifySubcategoryName = await selectSubcategoryByNameDAO({
    category: verifyCategoryName?.rows?.[0]?.id,
    name: subcategory,
  });
  if (verifySubcategoryName?.rows?.length === 0) {
    code = httpCode.BAD_REQUEST;
    message = `Não existe uma subcategoria: ${subcategory}, que faz parte da categoria: ${category}`;
    return { code, message };
  }

  if (!transaction_date) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar a data da transação";
    return { code, message };
  }

  if (!value) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o valor da transação";
    return { code, message };
  }

  const createTransaction = await insertTransactionDAO({
    transaction_type,
    category: verifyCategoryName?.rows?.[0]?.id,
    subcategory: verifySubcategoryName?.rows?.[0]?.id,
    action,
    transaction_date,
    value,
    observation,
    date,
  });
  if (createTransaction.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Transação criada com sucesso!`;
  }

  return { code, message };
};
