const router = require("express-promise-router")();
const tokenController = require("../controllers/token.controller");

router.post("/token/confirm", tokenController.confirmToken);

module.exports = router;
