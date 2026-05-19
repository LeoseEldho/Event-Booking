import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default:'user'
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    otp: {
        
    }
});

// const User = mongoose.models("User", userSchema);
export default mongoose.models("User", userSchema);