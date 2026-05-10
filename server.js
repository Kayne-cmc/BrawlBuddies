const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/auth/user");
const dataRouter = require("./routes/data");
const actionsRouter = require("./routes/actions");

dotenv.config();

// Startup env var validation
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "ORIGIN"];
const missingEnvVars = requiredEnvVars.filter((v) => !process.env[v]);
if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1);
}

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

const app = express();

//Middleware
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

// Auth rate limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

//Routers
app.use("/auth", authLimiter, userRouter);
app.use("/data", dataRouter);
app.use("/actions", actionsRouter);

//Connect to database
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connection to database successful");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});

connectDB();

//Listen to server
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
