const validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/user.model");

module.exports = async function validateRegister(data) {
    try {
        let errors = {};
        const { username, email, name, steamId, friendCode, password, passwordCheck } = data;
        const existingUser = await User.findOne({username: username});
        const existingEmail = await User.findOne({email: email});
    
        switch(true) {
            case (!username || !name || !steamId || !friendCode || !email || !password || !passwordCheck):
                errors.empty = "Please fill all required fields";
                errors.code = 400;
                break;
            case (!validator.isEmail(email)):
                errors.email = "Please enter a valid email";
                errors.code = 400;
                break;
            case (existingUser !== null):
                errors.user = "Account already exists";
                errors.code = 400;
                break;
            case (existingEmail !== null):
                errors.email = "Email is already used";
                errors.code = 400;
                break;
            case (!validator.equals(password, passwordCheck)):
                errors.password = "Passwords must match";
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