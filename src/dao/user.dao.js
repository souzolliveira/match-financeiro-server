const db = require("../config/database");
const { token_types } = require("../enumerations/token_types.enumeration");

exports.selectUserByEmailDAO = async ({ email }) => {
  const response = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return !response?.rows?.length;
};

exports.selectUserByPhoneNumberDAO = async ({ phone_number }) => {
  const response = await db.query(
    "SELECT * FROM users WHERE phone_number = $1",
    [phone_number]
  );
  return !response?.rows?.length;
};

exports.insertUserDAO = async ({
  name,
  email,
  password,
  phone_number,
  plan,
  goal,
}) => {
  const response = await db.query(
    "INSERT INTO users (name, email, password, phone_number, plan, goal) VALUES ($1, $2, $3, $4, $5, $6);",
    [name, email, password, phone_number, plan, goal]
  );
  return response;
};

exports.selectUserBySessionGuidDAO = async ({ session_guid }) => {
  const response = await db.query(
    "SELECT * FROM tokens WHERE token_type = $1 and token = $2",
    [token_types.AUTH, session_guid]
  );
  return { user_id: response?.rows[0]?.users_fk };
};
