const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

const dataRouter = express.Router();

dataRouter.get("/", auth, async (req,res) => {

    async function getMatches(user) {
        await User.find({ region: user.region, rating: user.rating});
        return matches;
    }

    try {
        const userData = req.payload;
        const matches = await getMatches(userData);

        res.json(matches);
    } catch(err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" });
    } 
});

module.exports = dataRouter;