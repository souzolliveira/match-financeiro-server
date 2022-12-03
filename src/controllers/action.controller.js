const db = require("../config/database");

exports.executeAction = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};
