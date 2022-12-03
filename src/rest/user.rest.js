const router = require("express-promise-router")();
const userController = require("../controllers/user.controller");

router.post("/user", userController.createUser);

router.put("/user/:id", userController.editUser);

router.delete("/user/:id", userController.deleteUser);

module.exports = router;

/**
 * posso salvar no front o id do user com md5 e mando no body do request ou param
 */
