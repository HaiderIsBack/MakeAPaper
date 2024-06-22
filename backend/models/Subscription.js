const mongoose = require("mongoose")

const subscriptionSchema = mongoose.Schema({
    userId: {
        type: String
    },
    subscriptionType: {
        type: String
    },
    subscriptionDetails: {
        type: Object
    },
    status: {
        type: String
    }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;