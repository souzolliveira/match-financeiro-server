const router = require("express-promise-router")();
const transactionController = require("../controllers/transaction.controller");

router.post("/transaction", transactionController.createTransactionController);

router.put("/transaction", transactionController.editTransactionController);

router.delete(
  "/transaction",
  transactionController.deleteTransactionController
);

module.exports = router;
