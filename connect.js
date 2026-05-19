const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://roboto:roboto123@cluster0.o8gfvlq.mongodb.net/");
        console.log("Connected to MongoDB.");
    } catch (err) {
        console.log("Connection Error: ", err);
        process.exit(1);
    }
}

module.exports = connectDB