const express = require("express");
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios")

const validateRegister = require("../../validation/registerValidation");
const validateLogin = require("../../validation/loginValidation");

const userRouter = express.Router();

userRouter.post("/register", async (req,res) => {
    const newUserCredentials = req.body;
    const { username, email, name, steamId, friendCode, password } = newUserCredentials;

    try {
        const { errors, isValid } = await validateRegister(newUserCredentials);

        if (!isValid) {
            return res.status(errors.code).send(errors);
        } else {

            //Get BrawlhallaId from SteamId
            axios
            .get('https://api.brawlhalla.com/search?steamid=' + steamId + '&api_key=7RB2I47437H3TT3JYJEN')
            .then(result => {
                brawlhallaId = result.data.brawlhalla_id

                //Get region and rating from BrawlhallaId
                axios
                .get('https://api.brawlhalla.com/player/' + brawlhallaId + '/ranked?api_key=7RB2I47437H3TT3JYJEN')
                .then(result => {

                    const { region, rating } = result.data;

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            const newUser = new User({
                                username: username,
                                email: email,
                                name: name,
                                steamId: steamId,
                                friendCode: friendCode,
                                region: region,
                                rating: rating,
                                passwordHash: hash
                            });
            
                            newUser.save();

                            const token = jwt.sign({
                                username: username,
                                name: name,
                                email: email,
                                steamId: steamId
                            }, process.env.JWT_SECRET);

                            return res.cookie("token", token, { httpOnly: true }).send();
                        });
                    });

                });
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

userRouter.post("/login", async (req,res) => {
    const userCredentials = req.body;
    const { username } = userCredentials;

    try {
        const { errors, isValid, existingUser } = await validateLogin(userCredentials);

        if (!isValid) {
            return res.status(errors.code).send(errors);
        } else {
            const token = jwt.sign({
                username: username,
                name: existingUser.name,
                steamId: existingUser.steamId
            }, process.env.JWT_SECRET);

            return res.cookie("token", token, { httpOnly: true }).send();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

userRouter.get("/logout", (req,res) => {
    res.cookie("token", "", { httpOnly: true, expires: new Date(0)}).send();
})

userRouter.get("/loggedIn", (req,res) => {
    const token = req.cookies.token;

    if(!token) {
        return res.json(false);
    }

    jwt.verify(token, process.env.JWT_SECRET)
});

module.exports = userRouter;