const db = require("../config/database");

exports.selectSubcategoryDAO = async ({ category, name }) => {
  const response = await db.query(
    `SELECT * FROM subcategories WHERE categories_fk = $1 ${
      name ? "and name = $2" : ""
    }`,
    name ? [category, name] : [category]
  );
  return response;
};

exports.insertSubcategoryDAO = async ({ category, costing, name, user_id }) => {
  const response = await db.query(
    "INSERT INTO subcategories (users_fk, categories_fk, costing, name) VALUES ($1, $2, $3, $4)",
    [user_id, category, costing, name]
  );
  return response;
};
