const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    steamId: {
        type: String,
        required: true
    },
    friendCode: {
        type: String,
        required: true
    },
    brawlhallaId: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true,
    },
    mainLegend: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    friends: {
        type: Array
    }
});

module.exports = mongoose.model("user", userModel);