const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const axios = require("axios");

const cheerio = require("cheerio");

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
        }).limit(50).exec((err, docs) => {
            if (!docs) {
                return res.status(500).json("No matches currently");
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
        const selfResult = await axios.get(
            "https://api.brawlhalla.com/player/" + req.payload.brawlhallaId + "/ranked?api_key=" + BRAWLHALLA_API
        );
        const selfPlayer = {
            name: req.payload.name,
            rating: req.payload.rating,
            peak_rating: selfResult.data.peak_rating,
            tier: selfResult.data.tier
        };

        const user = await User.findOne({ name: req.payload.name });
        if (!user) {
            return res.status(500).json("Something went wrong!");
        }

        if (!user.friends.length) {
            return res.json([selfPlayer]);
        }

        const friendStats = await Promise.all(
            user.friends.map(async (friend) => {
                const doc = await User.findOne({ name: friend }, "brawlhallaId");
                const result = await axios.get(
                    "https://api.brawlhalla.com/player/" + doc.brawlhallaId + "/ranked?api_key=" + BRAWLHALLA_API
                );
                return {
                    name: friend,
                    rating: result.data.rating,
                    peak_rating: result.data.peak_rating,
                    tier: result.data.tier
                };
            })
        );

        res.json([selfPlayer, ...friendStats]);
    } catch (err) {
        console.error(err);
        res.status(500).json("Something went wrong!");
    }
});

dataRouter.get("/legends", async (req, res) => {
    try {
        const response = await axios.get("https://brawlhalla.fandom.com/wiki/Legends");
        const $ = cheerio.load(response.data);
        const legends = [];

        $(".mw-parser-output table table img").each((i, elem) => {
            if (i % 2 === 0) {
                let legend = {};

                legend["name"] = $(elem).parent().attr("title");
                legend["img"] = $(elem).attr("src").split("png")[0] + "png";

                legends.push(legend);
            }
        });

        res.send(legends);
    } catch (err) {
        console.error(err);
        res.status(400).send("Could not retrieve legends");
    }
});

module.exports = dataRouter;