const {
  selectUserByEmail,
  selectUserByPhoneNumber,
  insertUser,
} = require("../dao/user.dao");
const { httpCode, httpMessage } = require("../entities/httpResponse.entity");

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

  const verifyEmail = await selectUserByEmail({ email });
  if (!verifyEmail) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cadastro com o email informado";
    return { code, message };
  }

  const verifyPhoneNumber = await selectUserByPhoneNumber({ phone_number });
  if (!verifyPhoneNumber) {
    code = httpCode.BAD_REQUEST;
    message = "Já existe um cadastro com o número de contato informado";
    return { code, message };
  }

  const createUser = await insertUser({
    name,
    email,
    password,
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
