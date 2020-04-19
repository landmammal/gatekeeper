const Router = require("express").Router;
const usersController = require("../controllers/users");

const router = Router();

// POST /login handles users log in
router.post("/login", usersController.loginUser);

// POST /register registers users to app
router.post("/register", usersController.registerUser);

module.exports = router;
