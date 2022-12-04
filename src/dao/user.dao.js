const db = require("../config/database");

exports.selectUserByEmail = async ({ email }) => {
  const response = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return !response?.rows?.length;
};

exports.selectUserByPhoneNumber = async ({ phone_number }) => {
  const response = await db.query(
    "SELECT * FROM users WHERE phone_number = $1",
    [phone_number]
  );
  return !response?.rows?.length;
};

exports.insertUser = async ({
  name,
  email,
  password,
  phone_number,
  plan,
  goal,
}) => {
  const response = await db.query(
    "INSERT INTO users (name, email, password, phone_number, plans_fk, goals_fk) VALUES ($1, $2, $3, $4, $5, $6);",
    [name, email, password, phone_number, plan, goal]
  );
  return response;
};
