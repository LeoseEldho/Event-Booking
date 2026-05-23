import express from "express";
import { authMiddleware, adminMiddleware } from "../Middleware/auth.js";
import { createEvent,getEventByID,getEvents,updateEvent,deleteEvent } from "../Controller/eventController.js";

const router = express.Router();

router.post("/create", createEvent);
router.get("/event", getEvents);
router.get("/eventID", getEventByID);
router.put("/update", updateEvent);
router.delete("/delete", deleteEvent);


export default router
