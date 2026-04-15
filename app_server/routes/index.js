var express = require("express");
var router = express.Router();

const ctrlMain = require("../controllers/main");

router.get("/", ctrlMain.index);
router.get("/about", ctrlMain.about);
router.get("/contact", ctrlMain.contact);
router.get("/meals", ctrlMain.meals);
router.get("/news", ctrlMain.news);
router.get("/rooms", ctrlMain.rooms);

module.exports = router;
