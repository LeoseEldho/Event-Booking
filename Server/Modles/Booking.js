import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required:true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "complete"],
        default:"pending"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default:"pending"
    },
    amount: {
        type: Number,
        required:true
    }
},{timestamps:true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking