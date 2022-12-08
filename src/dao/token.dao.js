const db = require("../config/database");
const { now } = require("../models/helpers/now");

exports.insertTokenDAO = async ({ token, token_type, user_id }) => {
  const date = now();
  const response = await db.query(
    "INSERT INTO tokens (token_type, users_fk, date, token) VALUES ($1, $2, $3, $4)",
    [token_type, user_id, date, token]
  );
  return response;
};
