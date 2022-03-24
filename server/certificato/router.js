const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/handler/formatter.js");

router.get("/api/certificati", f(controller.searchMany));
router.get("/api/certificato", f(controller.searchOne));
router.post("/api/certificato", f(controller.create));
router.delete("/api/certificati", f(controller.delete));

module.exports = router;
