const validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/user.model");
const dotenv = require("dotenv");
const SteamID = require("steamid");

dotenv.config();

module.exports = async function validateRegister(data) {
    try {
        let errors = {};
        const { email, steamId, friendCode, mainLegend, password, passwordCheck } = data;

        const sid = new SteamID(steamId);

        const existingEmail = await User.findOne({email: email});
    
        switch(true) {
            case (!steamId || !friendCode || !email || !mainLegend || !password || !passwordCheck):
                errors.message = "Please fill all required fields";
                errors.code = 400;
                break;
            case (!sid.isValid()):
                errors.message = "Invalid SteamID"
                errors.code = 404;
                break;
            case (!validator.isEmail(email)):
                errors.message = "Please enter a valid email";
                errors.code = 400;
                break;
            case (existingEmail):
                errors.message = "Email is already used";
                errors.code = 400;
                break;
            case (!validator.equals(password, passwordCheck)):
                errors.message = "Passwords must match";
                errors.code = 400;
                break;
            default:
                errors={};
                break;
        }

        let isValid = isEmpty(errors);

        return({errors, isValid});
    } catch(err) {
        console.error(err);
    }
};