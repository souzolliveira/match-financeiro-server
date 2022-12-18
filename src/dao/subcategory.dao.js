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

exports.insertSubcategoryDAO = async ({ category, costing, name }) => {
  const response = await db.query(
    "INSERT INTO subcategories (categories_fk, costing, name) VALUES ($1, $2, $3)",
    [category, costing, name]
  );
  return response;
};
