const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const axios = require("axios");

const dataRouter = express.Router();
const { BRAWLHALLA_API } = process.env;

dataRouter.get("/matches", auth, (req,res) => {
    try {
        const userData = req.payload;

        const lowerLimit= userData.rating - 300;
        const upperLimit= userData.rating + 300;
        
        User.find({
            email: { $ne: userData.email },
            region: userData.region,
            rating: { $gte: lowerLimit, $lte: upperLimit}
        }, (err, docs) => {
            if (!docs) {
                res.status.json("No matches currently");
            }
            res.status(200).json(docs);
        });
    } catch(err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" });
    } 
});

dataRouter.get("/stats", auth, async (req, res) => {
    try {
        const userData = req.payload;
        const playerData = await axios.get("https://api.brawlhalla.com/player/" + userData.brawlhallaId + "/ranked?api_key=" + BRAWLHALLA_API);

        res.status(200).json(playerData);
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" })
    }
});

module.exports = dataRouter;