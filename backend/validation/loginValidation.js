const isEmpty = require("is-empty");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports = async function validateRegister(data) {
    try {
        let errors = {};
        let correctPassword = false;

        const { email, password } = data;
        const existingUser = await User.findOne({ email: email});

        if(existingUser) {
            correctPassword = bcrypt.compare(password, existingUser.passwordHash);
        }
    
        switch(true) {
            case (!email || !password):
                errors.empty = "Please fill all required fields";
                errors.code = 400;
                break;
            case (existingUser === null || !correctPassword):
                errors.user = "Email or password is incorrect";
                errors.code = 401;
                break;
            default:
                errors={};
                break;
        }
        let isValid = isEmpty(errors);

        return({errors, isValid, existingUser});
    } catch(err) {
        console.error(err);
    }
};