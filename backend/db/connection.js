const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI || null;

const connect = () => {
    try{
        mongoose.connect(uri)
        console.log("Database Connected...")
    }catch (e){
        console.log(e);
    }
}

connect();