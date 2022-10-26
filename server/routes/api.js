const express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

//return array of new streaming movies in watchlist
router.get("/boxd/:user", controller.getCleanList);
