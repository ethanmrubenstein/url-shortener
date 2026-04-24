// Dependencies
const express = require("express");
const shortenerController = require("../controllers/shortener.controller");

// Express Router Configuration
const router = express.Router();

// Shortener Routes
router.get("/", shortenerController.shortener);

module.exports = router;
