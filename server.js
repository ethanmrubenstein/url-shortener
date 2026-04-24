// Dependencies
const express = require("express");
const dotenv = require("dotenv");
// Dotenv Configuration
dotenv.config({ quiet: true });
const colors = require("colors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const shortenerRoutes = require("./routes/shortener.routes");
const redirectRoutes = require("./routes/redirect.routes");
const connectDB = require("./config/db");

// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 20, // Max Requests
});

// Connect to MongoDB Database
connectDB();

// Express App Configuration
const app = express();

// Middleware
app.use(limiter);
app.use(helmet());
app.use(hpp());

// Shortener Routes
app.use("/s", shortenerRoutes);

// Redirect Routes
app.use("/", redirectRoutes);

app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener listening on http://localhost:${PORT}`);
});
