const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

const dataRouter = express.Router();

dataRouter.get("/", auth, (req,res) => {
    try {
        const userData = req.payload;

        const lowerLimit= userData.rating - 300;
        const upperLimit= userData.rating + 300;
        
        User.find({
            email: { $ne: userData.email},
            region: userData.region,
            rating: { $gte: lowerLimit, $lte: upperLimit}
        }, (err, docs) => {
            res.status(200).json(docs);
        });

    } catch(err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized" });
    } 
});

module.exports = dataRouter;