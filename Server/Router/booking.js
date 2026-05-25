import express from "express";
import { authMiddleware, adminMiddleware } from "../Middleware/auth";
import { bookEvent,cancelBooking,conformBooking,getMyBooking,sendBookingOTP } from "../Controller/bookingController";

const router = express.Router();

router.post("/", authMiddleware, bookEvent)
router.post("/",authMiddleware,bookEvent)
router.post("/",authMiddleware,bookEvent)
router.post("/",authMiddleware,bookEvent)
router.post("/",authMiddleware,bookEvent)

export default router