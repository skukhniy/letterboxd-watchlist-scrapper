const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

// return letterboxd Watchlist
router.get("/boxd/:user", controller.getBoxdList);

// return monthly Watchlist
router.get("/monthly/", controller.getMonthly);

//return array of new streaming movies in watchlist
router.get("/new/:user", controller.getCleanList);

module.exports = router;
