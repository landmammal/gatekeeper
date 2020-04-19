const express = require("express");
const users = require("./users");

// initializing router middleware
const router = express.Router();

// set up resource specific routes first argument is the url to look for in the request
router.use(users);

module.exports = router;
