const router = require("express-promise-router")();
const transactionController = require("../controllers/transaction.controller");

router.get("/transactions", transactionController.listTransactionsController);

router.post("/transaction", transactionController.createTransactionController);

router.put("/transaction", transactionController.editTransactionController);

router.delete(
  "/transaction",
  transactionController.deleteTransactionController
);

module.exports = router;
