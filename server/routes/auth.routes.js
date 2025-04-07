import express from "express";
import { register, login, getProfile, changePassword } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, getProfile); // auth added 
router.put("/change-password", authMiddleware, changePassword);// auth added 

export default router;
