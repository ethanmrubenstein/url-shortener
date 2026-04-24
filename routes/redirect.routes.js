// Dependencies
const express = require("express");
const redirectController = require("../controllers/redirect.controller");

// Express Router Configuration
const router = express.Router();

// Redirect Routes
router.get("/:slug", redirectController.redirect);

module.exports = router;
