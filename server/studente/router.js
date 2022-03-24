const express = require("express");
const router = express.Router();
const controller = require("./controller.js");
const f = require("../utility/handler/formatter.js");

router.get("/api/studenti", f(controller.searchMany));
router.get("/api/studente", f(controller.searchOne));
router.post("/api/studente", f(controller.create));
router.delete("/api/studenti", f(controller.delete));

module.exports = router;
