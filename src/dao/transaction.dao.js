const db = require("../config/database");

exports.insertTransactionDAO = async ({
  transaction_type,
  category,
  subcategory,
  action,
  transaction_date,
  value,
  observation,
  date,
}) => {
  const response = await db.query(
    "INSERT INTO transactions (transaction_type, categories_fk, subcategories_fk, action, transaction_date, value, observation, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
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
