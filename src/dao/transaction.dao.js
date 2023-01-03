const db = require("../config/database");

exports.listTransactionsDAO = async ({ user_id }) => {
  const response = await db.query(
    "SELECT * from transactions WHERE users_fk = $1",
    [user_id]
  );
  return response;
};

exports.insertTransactionDAO = async ({
  transaction_type,
  category,
  subcategory,
  action,
  transaction_date,
  value,
  observation,
  date,
  user_id,
}) => {
  const response = await db.query(
    "INSERT INTO transactions (users_fk, transaction_type, categories_fk, subcategories_fk, action, transaction_date, value, observation, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      user_id,
      transaction_type,
      category,
      subcategory,
      action,
      transaction_date,
      value,
      observation,
      date,
    ]
  );
  return response;
};
