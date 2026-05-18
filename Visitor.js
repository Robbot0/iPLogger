const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

mongoose.connect("mongodb+srv://roboto:roboto123@cluster0.o8gfvlq.mongodb.net/");

const visitorSchema = new mongoose.Schema({
    ip: String,
    model: String,
    os: String,
    timeStamp: String
});

const Visitor = mongoose.model("Visitor", visitorSchema);