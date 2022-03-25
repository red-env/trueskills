const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/formatter/response_formatter.js");
const jwt_verify = require("../utility/middleware/jwt_verify");

router.post("/api/login", f(controller.login));
router.post("/api/utente", f(controller.create));
router.get("/api/utente", jwt_verify, f(controller.searchOne));

//DEV
router.delete("/api/utenti", jwt_verify, f(controller.delete));

module.exports = router;
