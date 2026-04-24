const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_CONN_STRING);
  console.log("MongoDB Connected Successfully!");
};

module.exports = connectDB;
