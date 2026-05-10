const express = require("express");
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const validateRegister = require("../../validation/registerValidation");
const validateLogin = require("../../validation/loginValidation");
const { BRAWLHALLA_API } = process.env;

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const newUserCredentials = req.body;
    const { email, steamId, friendCode, mainLegend, password } = newUserCredentials;

    try {
        const { errors, isValid } = await validateRegister(newUserCredentials);

        if (!isValid) {
            return res.status(errors.code).send(errors);
        }

        // Get BrawlhallaId from SteamId
        const searchResult = await axios.get(
            'https://api.brawlhalla.com/search?steamid=' + steamId + '&api_key=' + BRAWLHALLA_API
        );
        const brawlhallaId = searchResult.data.brawlhalla_id;

        console.log("brawlid", brawlhallaId);

        // Get region from BrawlhallaId
        const rankedResult = await axios.get(
            'https://api.brawlhalla.com/player/' + brawlhallaId + '/ranked?api_key=' + BRAWLHALLA_API
        );
        const { name, region, rating } = rankedResult.data;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const friends = [];
        const newUser = new User({
            email: email,
            name: name,
            steamId: steamId,
            friendCode: friendCode,
            brawlhallaId: brawlhallaId,
            region: region,
            mainLegend: mainLegend,
            rating: rating,
            friends: friends,
            passwordHash: hash
        });

        await newUser.save();

        const token = jwt.sign({
            name: name,
            email: email,
            friendCode: friendCode,
            brawlhallaId: brawlhallaId,
            region: region,
            rating: rating,
            friends: friends
        }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true }).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

userRouter.post("/login", async (req, res) => {
    const userCredentials = req.body;

    try {
        const { errors, isValid, existingUser } = await validateLogin(userCredentials);

        if (!isValid) {
            return res.status(errors.code).send(errors);
        }

        const rankedResult = await axios.get(
            'https://api.brawlhalla.com/player/' + existingUser.brawlhallaId + '/ranked?api_key=' + BRAWLHALLA_API
        );
        const newRating = rankedResult.data.rating;

        await User.findOneAndUpdate(
            { email: existingUser.email },
            { rating: newRating }
        ).exec();

        const token = jwt.sign({
            name: existingUser.name,
            email: existingUser.email,
            friendCode: existingUser.friendCode,
            brawlhallaId: existingUser.brawlhallaId,
            region: existingUser.region,
            rating: newRating,
            friends: existingUser.friends
        }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true }).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

userRouter.get("/logout", (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        .send();
});

userRouter.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json(false);
        }

        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

module.exports = userRouter;
