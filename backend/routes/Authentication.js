const loginRouter = require("express")();
const registerRouter = require("express")();
const {login, register} = require("../controllers/Authentication")

loginRouter.route("/login").get(login);
registerRouter.route("/register").post(register)

module.exports = {
    loginRouter,
    registerRouter
}