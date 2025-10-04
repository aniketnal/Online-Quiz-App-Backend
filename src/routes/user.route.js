import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/register", registerUser)
router.route("/login", loginUser)

// secured routes
router.route("logout", verifyJWT, logoutUser)


export default router;