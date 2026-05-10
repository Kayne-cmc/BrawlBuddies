const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const userRouter = require("../routes/auth/user");
const dataRouter = require("../routes/data");
const actionsRouter = require("../routes/actions");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

// Cache DB connection across warm serverless invocations
let isConnected = false;
async function connectDB() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
}

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use("/auth", authLimiter, userRouter);
app.use("/data", dataRouter);
app.use("/actions", actionsRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
