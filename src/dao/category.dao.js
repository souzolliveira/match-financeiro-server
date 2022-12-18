const db = require("../config/database");

exports.selectCategory = async ({ transaction_type, name, user_id }) => {
  console.log(
    0,
    transaction_type,
    user_id,
    name,
    `SELECT * FROM categories WHERE users_fk = $1 and transaction_type = $2 ${
      name ? "and name = $3" : ""
    }`
  );
  const response = await db.query(
    `SELECT * FROM categories WHERE users_fk = $1 and transaction_type = $2 ${
      name ? "and name = $3" : ""
    }`,
    name ? [user_id, transaction_type, name] : [user_id, transaction_type]
  );
  console.log(1, response);
  return response;
};

exports.insertCategoryDAO = async ({ transaction_type, name, user_id }) => {
  const response = await db.query(
    "INSERT INTO categories (name, transaction_type, users_fk) VALUES ($1, $2, $3)",
    [name, transaction_type, user_id]
  );
  return response;
};
