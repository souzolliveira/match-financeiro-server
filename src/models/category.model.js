const {
  selectCategoryByNameDAO,
  insertCategoryDAO,
} = require("../dao/category.dao");
const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const {
  transaction_types,
} = require("../enumerations/transaction_types.enumeration");

exports.createCategoryModel = async ({ transaction_type, name, user_id }) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o nome da categoria";
    return { code, message };
  }

  if (!transaction_type) {
    code = httpCode.BAD_REQUEST;
    message = `É necessário informar o tipo de transação da categoria`;
    return { code, message };
  }

  if (!transaction_types[transaction_type]) {
    code = httpCode.BAD_REQUEST;
    message = `Valor inválido para Tipo de Transação: ${transaction_type}`;
    return { code, message };
  }

  const verifyCategoryName = await selectCategoryByNameDAO({
    transaction_type,
    name,
    user_id,
  });
  if (verifyCategoryName.rows.length > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Já existe uma categoria ${name} para este tipo de transação`;
    return { code, message };
  }

  const createCategory = await insertCategoryDAO({
    transaction_type,
    name,
    user_id,
  });
  if (createCategory) {
    code = httpCode.CREATED;
    message = `Categoria ${name.toUpperCase()} criada com sucesso!`;
    return { code, message };
  }

  return { code, message };
};
