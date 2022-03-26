const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const role_verify = require("../utility/middleware/role_verify.js");
const ruoli = require("../utility/constants/ruoli.json");
const f = require("../utility/formatter/response_formatter.js");
const jwt_verify = require("../utility/middleware/jwt_verify");

router.get("/api/certificati", jwt_verify, f(controller.searchMany));
router.get("/api/certificati_personali", jwt_verify, f(controller.searchManyPersonali));
router.get("/api/certificato", f(controller.searchOne));
router.get("/api/certificato_pdf", controller.generatePdf);
router.post("/api/certificato", jwt_verify, role_verify(ruoli.SEGRETERIA), f(controller.create));

module.exports = router;
