const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    ip: String,
    model: String,
    os: String,
    time: String
});

const Visitor = mongoose.model("Visitor", visitorSchema);