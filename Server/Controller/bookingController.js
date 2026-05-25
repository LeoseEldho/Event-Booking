import Booking from "../Modles/Booking.js";
import OTP from "../Modles/Otp.js";
import Event from "../Modles/Event.js";
import { sendOTPEmail, sendBookingEmail } from "../Utils/email.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendBookingOTP = async (req, res) => {
  try {
    const otp = generateOTP();
    await OTP.findOneAndDelete({
      email: req.body.email,
      action: "event_booking",
    });
    await OTP.create({
      email: req.body.email,
      otp: otp,
      action: "event_booking",
    });
    await sendBookingEmail({
      email: req.body.email,
      otp: otp,
      action: "event_booking",
    });

    res.status(201).json({ success: true, message: "OTP send successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;
    const eventRecord = await OTP.findOne({
      email: req.body.email,
      otp,
      action: "event_booking",
    });
    if (!eventRecord) {
      return res.status(401).json({ success: false, message: "invaild Otp" });
    }
    const event = Event.findById(eventId);
    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Event not found!" });
    }
    if (event.totalseats <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "No seats available" });
    }
    const existingbooking = await Booking.findOne({ email: req.body.email });
    if (existingbooking) {
      return res
        .status(400)
        .json({ success: false, message: "You already have booked" });
    }
    const booking = await Booking.create({
      UserId: req.UserId,
      eventId,
        amount: event.ticketPrice,
        paymentStatus: "pending",
      status:"pending"
    });
      
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyBooking = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const conformBooking = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
