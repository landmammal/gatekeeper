import { Router } from "express";
import usersController from "../controllers/users";

const router = Router();

// POST /login handles users log in
router.post("/login", usersController.loginUser);

// POST /register registers users to app
router.post("/register", usersController.registerUser);

module.exports = router;
