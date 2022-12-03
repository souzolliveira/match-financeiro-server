const router = require("express-promise-router")();
const authController = require("../controllers/authentication.controller");

router.post("/sign-in", authController.signIn);

router.post("/sign-out", authController.signOut);

module.exports = router;
