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
        type: Number,
        required: true
    },
    friendCode: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("user", userModel);