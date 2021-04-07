const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth/user");
const dataRouter = require("./routes/data");

dotenv.config();

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

const app = express();

//Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());

//Routers
app.use("/auth", userRouter);
app.use("/data", dataRouter);

//Connect to database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connection to server successful");
});

//Listen to server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});