//Database Connection
require("./db/connection")

//Importing Dependencies
const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const { loginRouter, registerRouter } = require("./routes/Authentication");

//Config
const PORT = process.env.PORT || 8080;
const app = express();
const router = express();

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Utilizing Routes
app.use("/api/v1",loginRouter);
app.use("/api/v1",registerRouter);

//Listening On PORT
app.listen(PORT, ()=>console.log("Server is Running on PORT : " + PORT))