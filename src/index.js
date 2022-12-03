const express = require("express");
let cors = require("cors");

const application = express();
const port = process.env.PORT || 8080;

const index = require("./rest/index");
const authRest = require("./rest/authentication.rest");
const categoryRest = require("./rest/category.rest");
const subcategoryRest = require("./rest/subcategory.rest");
const tokenRest = require("./rest/token.rest");
const transactionRest = require("./rest/transaction.rest");
const userRest = require("./rest/user.rest");

application.use(express.urlencoded({ extended: true }));
application.use(express.json());
application.use(express.json({ type: "application/vnd.api+json" }));
application.use(cors());

application.use(index);
application.use("/api", authRest);
application.use("/api", categoryRest);
application.use("/api", subcategoryRest);
application.use("/api", tokenRest);
application.use("/api", transactionRest);
application.use("/api", userRest);

application.listen(port, () => {
  console.log("Aplicação executando na porta ", port);
});
