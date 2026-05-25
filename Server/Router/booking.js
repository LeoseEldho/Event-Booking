import express from "express";
import { authMiddleware, adminMiddleware } from "../Middleware/auth.js";
import { bookEvent,cancelBooking,conformBooking,getMyBooking,sendBookingOTP } from "../Controller/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, bookEvent)
router.post("/",authMiddleware,bookEvent)
router.post("/",authMiddleware,bookEvent)
router.post("/",authMiddleware,bookEvent)
router.post("/",authMiddleware,bookEvent)

export default router