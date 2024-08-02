const validateRouter = require("express")();

validateRouter.route("/validate").head((req, res) => {
    res.status(200)
})

module.exports = validateRouter