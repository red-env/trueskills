const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/formatter/response_formatter.js");

router.get("/api/segreterie", f(controller.searchMany));
router.get("/api/segreteria", f(controller.searchOne));

module.exports = router;