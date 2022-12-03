const express = require("express");

const router = express.Router();
const pingController = require("../controllers/ping.controller");

router.get("/api", pingController.ping);
router.get("/api/ping", pingController.ping);

module.exports = router;
