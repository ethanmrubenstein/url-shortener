const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_CONN_STRING);
};

module.exports = connectDB;
