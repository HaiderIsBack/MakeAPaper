const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
    book:{
        type: String,
        required: true
    },
    chapters: {
        type: Array
    },
    author: {
        type: String
    },
    publisher: {
        type: String
    },
    modified: {
        type: String
    }
});

const Docs = mongoose.model("Docs", docSchema);

module.exports = Docs;