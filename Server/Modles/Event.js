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
        required:true
    }
});

const Event = mongoose.model("Event", eventMongoose);

export default Event;