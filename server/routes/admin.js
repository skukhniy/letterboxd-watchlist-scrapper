const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

// return letterboxd Watchlist
router.post("/add/newstreaming/", controller.addNewStreaming);

module.exports = router;
