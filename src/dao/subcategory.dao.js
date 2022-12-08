const db = require("../config/database");

exports.selectSubcategoryByNameDAO = async ({ category, name }) => {
  const response = await db.query(
    "SELECT * FROM subcategories WHERE categories_fk = $1 and name = $2",
    [category, name]
  );
  return response;
};

exports.insertSubcategoryDAO = async ({ category, costing, name }) => {
  const response = await db.query(
    "INSERT INTO subcategories (categories_fk, costing, name) VALUES ($1, $2, $3)",
    [category, costing, name]
  );
  return response;
};
