const router = require("express-promise-router")();
const authController = require("../controllers/authentication.controller");

router.post("/sign-in", authController.signInController);

router.post("/sign-out", authController.signOutController);

module.exports = router;
