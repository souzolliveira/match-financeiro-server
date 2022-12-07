const {
  selectUserByEmailDAO,
  selectUserByPhoneNumberDAO,
  insertUserDAO,
  selectUserBySessionGuidDAO,
} = require("../dao/user.dao");
const {
  httpCode,
  httpMessage,
} = require("../enumerations/httpResponse.enumeration");
const { convertStringToMD5 } = require("./helpers/md5");

exports.createUserModel = async ({
  name,
  email,
  password,
  phone_number,
  plan,
  goal,
}) => {
  let code = httpCode.ERROR;
  let message = httpMessage.ERROR;

  const verifyEmail = await selectUserByEmailDAO({ email });
  if (!verifyEmail) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cadastro com o email informado";
    return { code, message };
  }

  const verifyPhoneNumber = await selectUserByPhoneNumberDAO({ phone_number });
  if (!verifyPhoneNumber) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cadastro com o número de contato informado";
    return { code, message };
  }

  const createUser = await insertUserDAO({
    name,
    email,
    password: await convertStringToMD5(password),
    phone_number,
    plan,
    goal,
  });
  if (createUser) {
    code = httpCode.CREATED;
    message = "Cadastro efetuado com sucesso!";
    return { code, message };
  }

  return { code, message };
};

exports.getUserBySessionGuid = async ({ session_guid }) => {
  const { user_id } = await selectUserBySessionGuidDAO({ session_guid });
  if (user_id) return { user_id };
  return { user_id: null };
};
