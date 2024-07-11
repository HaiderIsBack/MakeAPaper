const mongoose = require("mongoose")

const requestSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookName: {
        type: String
    },
    message: {
        type: String
    }
})

const Requests = mongoose.model("Requests", requestSchema)

export default Requests;