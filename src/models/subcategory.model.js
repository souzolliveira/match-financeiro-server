const { selectCategoryByNameDAO } = require("../dao/category.dao");
const {
  insertSubcategoryDAO,
  selectSubcategoryByNameDAO,
} = require("../dao/subcategory.dao");
const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { costing: costingEnum } = require("../enumerations/costing.enumeration");

exports.createSubcategoryModel = async ({
  transaction_type,
  category,
  name,
  costing,
  user_id,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  if (!category) {
    code = httpCode.BAD_REQUEST;
    message =
      "É necessário informar a qual categoria a subcategoria fará parte";
    return { code, message };
  }

  const category_fk = await selectCategoryByNameDAO({
    transaction_type,
    name: category,
    user_id,
  });
  if (category_fk?.rows?.length === 0) {
    code = httpCode.BAD_REQUEST;
    message = `Não existe uma categoria com esse nome: ${category}`;
    return { code, message };
  }

  if (!name) {
    code = httpCode.BAD_REQUEST;
    message = "É necessário informar o nome da subcategoria";
    return { code, message };
  }

  const verifySubcategoryName = await selectSubcategoryByNameDAO({
    category: category_fk?.rows?.[0]?.id,
    name,
  });
  if (verifySubcategoryName?.rows?.length > 0) {
    code = httpCode.BAD_REQUEST;
    message = `Já existe uma subcategoria: ${name}, que faz parte da categoria: ${category}`;
    return { code, message };
  }

  if (!costing || !costingEnum[costing]) {
    code = httpCode.BAD_REQUEST;
    message =
      "É necessário informar o tipo de custo da subcategoria: FIXO ou VARIÁVEL";
    return { code, message };
  }

  const createSubcategory = await insertSubcategoryDAO({
    category: category_fk?.rows?.[0]?.id,
    costing: costingEnum[costing],
    name,
  });
  if (createSubcategory) {
    code = httpCode.CREATED;
    message = `Subcategoria ${name.toUpperCase()} de categoria ${category} criada com sucesso!`;
  }

  return { code, message };
};
