import mongoose from "mongoose";

const eventMongoose = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    descreption: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    totalseats: {
        type: String,
        required:true
    },
    availableseats: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    createdBt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
},{timestamps:true});

const Event = mongoose.model("Event", eventMongoose);

export default Event;