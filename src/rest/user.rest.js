const router = require("express-promise-router")();
const userController = require("../controllers/user.controller");

router.post("/user", userController.createUserController);

router.put("/user/:id", userController.editUserController);

router.delete("/user/:id", userController.deleteUserController);

module.exports = router;

/**
 * pegar o id do user a partir do session guid enviado do front nos headers das chamadas
 */
