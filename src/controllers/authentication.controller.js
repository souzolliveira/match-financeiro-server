const db = require("../config/database");

exports.signIn = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};

exports.signOut = async (req, res) => {
  res.status(201).send({
    message: "Product added successfully!",
    body: {},
  });
};
