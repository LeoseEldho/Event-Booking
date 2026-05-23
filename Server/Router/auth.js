import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../Controller/authController.js";

import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authMiddleware, loginUser);
router.post("/verify", authMiddleware, verifyUser);

export default router;
