const db = require("../config/database");

exports.selectCategoryDAO = async ({ transaction_type, name, user_id }) => {
  const response = await db.query(
    `SELECT * FROM categories WHERE users_fk = $1 and transaction_type = $2 ${
      name ? "and name = $3" : ""
    }`,
    name ? [user_id, transaction_type, name] : [user_id, transaction_type]
  );
  return response;
};

exports.insertCategoryDAO = async ({ transaction_type, name, user_id }) => {
  const response = await db.query(
    "INSERT INTO categories (users_fk, name, transaction_type) VALUES ($1, $2, $3)",
    [user_id, name, transaction_type]
  );
  return response;
};
