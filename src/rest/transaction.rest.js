const router = require("express-promise-router")();
const transactionController = require("../controllers/transaction.controller");

router.post("/transaction", transactionController.createTransaction);

router.put("/transaction", transactionController.editTransaction);

router.delete("/transaction", transactionController.deleteTransaction);

module.exports = router;
