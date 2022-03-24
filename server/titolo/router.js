const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/handler/formatter.js");

router.get("/api/titoli", f(controller.searchMany));
router.get("/api/titolo", f(controller.searchOne));
router.post("/api/titolo", f(controller.create));
router.delete("/api/titoli", f(controller.delete));

module.exports = router;
