import express from "express";
import  verifyJWT  from "../middlewares/auth.middleware.js";
import { getUserResults } from "../controllers/result.controller.js";

const router = express.Router();

router.route("/my-results").get(verifyJWT, getUserResults);

export default router;
