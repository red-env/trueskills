const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/formatter/response_formatter.js");
const jwt_verify = require("../utility/middleware/jwt_verify");

router.get("/api/studenti", jwt_verify, f(controller.searchMany));
router.get("/api/studente", jwt_verify, f(controller.searchOne));

module.exports = router;
