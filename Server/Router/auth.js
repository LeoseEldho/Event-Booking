import express from "express";
import {
  registerUser,
  loginUser,
  verifyUser,
} from "../Controller/authController.js";
import testing from "../Middleware/testing.js";

const router = express.Router();

router.post("/register", testing, registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyUser);

export default router;
