const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const axios = require("axios");

const request = require("request");
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
        }, (err, docs) => {
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

dataRouter.get("/stats", auth, (req, res) => {
    try {
        const { friends } = req.payload;
        const stats = [];
        
        friends.map((friend) => {
            User.findOne({ name: friend }, "brawlhallaId", (err,doc) => {
                axios
                .get("https://api.brawlhalla.com/player/" + doc.brawlhallaId + "/ranked?api_key=" + BRAWLHALLA_API)
                .then(result => {
                    const player = {
                        name: friend,
                        rating: result.data.rating,
                        peak_rating: result.data.peak_rating,
                        tier: result.data.tier
                    };

                    stats.push(player);

                    if(stats.length === friends.length) {
                        const { brawlhallaId } = req.payload;
                        axios
                        .get("https://api.brawlhalla.com/player/" + brawlhallaId + "/ranked?api_key=" + BRAWLHALLA_API)
                        .then(result => {
                            const player = {
                                name: req.payload.name,
                                rating: req.payload.rating,
                                peak_reating: result.data.peak_rating,
                                tier: result.data.tier
                            }

                            stats.push(player);
                            console.log(stats)
                            res.send(stats);
                        })
                        .catch(err => console.error(err));
                    }
                })
                .catch(err => console.error(err));
            })
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" });
    }
});

dataRouter.get("/legends", (req, res) => {
    request("https://brawlhalla.fandom.com/wiki/Legends", (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
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
        } else {
            res.status(400).send("Could not retrieve legends");
        }
    });
});

module.exports = dataRouter;