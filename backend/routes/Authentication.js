const loginRouter = require("express")();
const registerRouter = require("express")();
const authVerifyRouter = require("express")();
const {login, register} = require("../controllers/Authentication")

loginRouter.route("/login").post(login);
registerRouter.route("/register").post(register)

authVerifyRouter.route("/auth/verify").head((req, res) => {
    try {
        if(req.user.userId){
            res.sendStatus(200);
        }else{
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = {
    loginRouter,
    registerRouter,
    authVerifyRouter
}