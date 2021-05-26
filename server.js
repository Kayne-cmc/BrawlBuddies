const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRouter = require("./routes/auth/user");
const dataRouter = require("./routes/data");
const actionsRouter = require("./routes/actions");

dotenv.config();

const PORT = process.env.PORT || 5000;
const { MONGO_URI } = process.env;

const app = express();

//Middleware
app.use(express.static(path.join(__dirname, "client/build")));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.ORIGIN],
    credentials: true,
}));

//Routers
app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/actions", actionsRouter);

//Connect to database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connection to database successful");
});

//Listen to server
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});