const jwt = require("jsonwebtoken");
const axios = require("axios");

function auth(req,res,next) {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = verified;
        
        next();
    } catch(err) {
        console.error(err);
        res.status(401).json({ error: "Unauthorized"});
    }   
}

module.exports = auth;