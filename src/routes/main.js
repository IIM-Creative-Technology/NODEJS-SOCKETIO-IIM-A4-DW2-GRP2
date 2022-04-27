const express = require("express");
const MainController = require("../../controllers/main");
const router = express.Router();

router.get("/", MainController.index);
router.post("/", MainController.insert);
router.get("/socket-test", MainController.socketTest);

module.exports = router;
