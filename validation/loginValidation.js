const isEmpty = require("is-empty");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports = async function validateLogin(data) {
    try {
        let errors = {};
        let correctPassword = false;

        const { email, password } = data;
        const existingUser = await User.findOne({ email: email});

        if(existingUser) {
            await bcrypt.compare(password, existingUser.passwordHash)
                .then(res => correctPassword = res)
                .catch(err => console.log(err));
        }
    
        switch(true) {
            case (!email || !password):
                errors.message = "Please fill all required fields";
                errors.code = 400;
                break;
            case (existingUser === null || !correctPassword):
                errors.message = "Email or password is incorrect";
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