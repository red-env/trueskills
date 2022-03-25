const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/formatter/response_formatter.js");

router.get("/api/blockchain_types", f(controller.searchMany));
router.get("/api/blockchain_type", f(controller.searchOne));
router.post("/api/blockchain_type", f(controller.create));
router.delete("/api/blockchain_types", f(controller.delete));

module.exports = router;
