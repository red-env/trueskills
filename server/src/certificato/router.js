const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const role_verify = require("../utility/middleware/role_verify.js");
const ruoli = require("../utility/constants/ruoli.json");
const f = require("../utility/formatter/response_formatter.js");

router.get("/api/certificati", f(controller.searchMany));
router.get("/api/certificati_studente", f(controller.searchManyByStudente));
router.get("/api/certificato", f(controller.searchOne));
router.post("/api/certificato", role_verify(ruoli.SEGRETERIA), f(controller.create));

module.exports = router;
