const mongoose = require("mongoose");

let connectionPromise = null;

function connectDB() {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("connected to DB"));
    }
    return connectionPromise;
}

module.exports = connectDB;