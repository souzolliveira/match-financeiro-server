const { selectCategoryDAO } = require("../dao/category.dao");
const { selectSubcategoryDAO } = require("../dao/subcategory.dao");
const {
  insertTransactionDAO,
  listTransactionsDAO,
} = require("../dao/transaction.dao");
const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { now } = require("./helpers/now");

exports.listTransactionsModel = async ({ user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;
  let data = [];

  const listTransactions = await listTransactionsDAO({
    user_id,
  });
  if (listTransactions.rowCount > 0) {
    code = httpCode.OK;
    message = "Transaçãos retornadas com sucesso!";
    data = listTransactions.rows?.map((row) => {
      return {
        transaction_type: row.transaction_type,
        categories_fk: row.categories_fk, // TODO: retornar o nome da categoria
        subcategories_fk: row.subcategories_fk, // TODO: retornar o nome da subcategoria
        action: row.action,
        transaction_date: row.transaction_date,
        value: row.value,
        observation: row.observation,
        date: row.date,
      };
    });
  }

  return { code, message, data };
};

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

  const verifyCategoryName = await selectCategoryDAO({
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

  const verifySubcategoryName = await selectSubcategoryDAO({
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
    user_id,
  });
  if (createTransaction.rowCount > 0) {
    code = httpCode.CREATED;
    message = `Transação criada com sucesso!`;
  }

  return { code, message };
};
