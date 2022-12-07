const db = require("../config/database");

exports.selectEmailAndPasswordDAO = async ({ email, password }) => {
  const response = await db.query(
    "SELECT id, name, email, phone_number, plan, goal FROM users WHERE email = $1 and password = $2",
    [email, password]
  );
  return response;
};
