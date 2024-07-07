const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const AuthRequest = (req, res, next) => {
    try {
        const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "This_Is_JWT_App_Secret_@#£_";
        if(token){
            jwt.verify(token, JWT_SECRET_KEY, (err, user)=>{
                if(err){
                    return res.sendStatus(403)
                }
                req.user = user
                next()
            })
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = AuthRequest