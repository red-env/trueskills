const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const role_verify = require("../utility/middleware/role_verify.js");
const ruoli = require("../utility/constants/ruoli.json");
const f = require("../utility/formatter/response_formatter.js");
const jwt_verify = require("../utility/middleware/jwt_verify");

router.get("/api/titoli", jwt_verify, f(controller.searchMany));
router.get("/api/titoli_segreteria", jwt_verify, f(controller.searchManyBySegreteria));
router.get("/api/titolo", f(controller.searchOne));
router.post("/api/titolo", jwt_verify, role_verify(ruoli.SEGRETERIA), f(controller.create));

module.exports = router;
