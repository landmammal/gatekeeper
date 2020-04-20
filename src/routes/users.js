const Router = require("express").Router;
const usersController = require("../controllers/users");

const router = Router();

// POST /login handles users log in
router.post("/", usersController.loginUser);

// POST /register registers users to app
router.post("/api/register", usersController.registerUser);

module.exports = router;
