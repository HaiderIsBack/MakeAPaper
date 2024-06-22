const paymentRoute = require("express")();
const pay = require("../controllers/Payment")

paymentRoute.route("/pay").post(pay)

module.exports = paymentRoute;