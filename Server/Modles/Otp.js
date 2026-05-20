import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
       required:true 
    },
    otp: {
        type: String,
        required:true
    },
    action: {
        type: String,
        enam:["account_verify","event_booking"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:300
    }
},);

const OTP = await mongoose.model("OTP", otpSchema);

export default otpSchema;