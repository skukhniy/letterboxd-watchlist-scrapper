const express = require("express");
const router = express.Router();
const controller = require("../controllers/adminController");

// return letterboxd Watchlist
router.post("/add/newstreaming/:id", controller.uploadMonthly);

module.exports = router;
