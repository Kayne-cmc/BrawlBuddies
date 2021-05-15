const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user.model");

const actionsRouter = express.Router();

actionsRouter.post("/add", auth, async (req, res) => {
    const { friendName } = req.body;

    User.findOne({ name: req.payload.name }, (err, doc) => {
        if(!doc) {
            return res.status(500).send("Something went wrong. Please try again later");
        }

        const friendExists = doc.friends.includes(friendName);
        if(friendExists) {
            res.send(`You've already added ${friendName}!`);
        } else {
            doc.friends.push(friendName);
            doc.save();
            res.send(`Successfully added ${friendName}!`);
        }
    });
});

actionsRouter.post("/remove", auth, (req,res) => {
    const { friendName } = req.body;

    User.findOne({ name: req.payload.name }, (err, doc) => {
        if(!doc) {
            return res.status(500).send("Something went wrong. Please try again later");
        }

        const index = doc.friends.indexOf(friendName);
        if(index > -1) {
            doc.friends.splice(index, 1);
            doc.save();
            res.send(`Successfully removed!`);
        } else {
            res.status(500).send("Something went wrong. Please try again later");
        }
    });
})

module.exports = actionsRouter;