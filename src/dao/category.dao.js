const db = require("../config/database");

exports.selectCategoryByNameDAO = async ({
  transaction_type,
  name,
  user_id,
}) => {
  console.log("select", transaction_type, name, user_id);
  const response = await db.query(
    "SELECT * FROM categories WHERE users_fk = $1 and transaction_type = $2 and name = $3",
    [user_id, transaction_type, name]
  );
  return response;
};

exports.insertCategoryDAO = async ({ transaction_type, name, user_id }) => {
  const response = await db.query(
    "INSERT INTO categories (name, transaction_type, users_fk) VALUES ($1, $2, $3)",
    [name, transaction_type, user_id]
  );
  return response;
};
