const express = require("express");
const jwt = require("jsonwebtoken");

const dataRouter = express.Router();

dataRouter.get("/", (req,res) => {
    const token = req.token;

    const payload = jwt.verify(token, process.env.JWT_SECRET, { httpOnly: true });

    if(!payload) {
        return res.status(401).send();
    }

    const steamId = payload.steamId;

    res.json(steamId);
});

module.exports = dataRouter;