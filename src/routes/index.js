import express from "express";
import users from "./users.js";

// initializing router middleware
const router = express.Router();

// set up resource specific routes first argument is the url to look for in the request
router.use(users);

module.exports = router;
