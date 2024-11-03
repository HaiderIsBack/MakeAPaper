//Database Connection
require("./db/connection")

//Importing Dependencies
const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const { loginRouter, registerRouter, authVerifyRouter } = require("./routes/Authentication");
const docsRouter = require("./routes/Docs");
const paymentRoute = require("./routes/Payment");
const AuthRequest = require("./middleware/Authenticate");
const recaptchaRouter = require("./routes/ReCaptcha")

//Config
const PORT = process.env.PORT || 8080;
const app = express();

const API_PREFIX = "/api/v1";

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ReCAPTCHA Verification
app.use(API_PREFIX, recaptchaRouter);

//Utilizing Routes
app.use(API_PREFIX,  loginRouter);
app.use(API_PREFIX,  registerRouter);

// Authentication Middleware
app.use(AuthRequest);
app.use(API_PREFIX, authVerifyRouter);

app.use(API_PREFIX,  docsRouter);
// app.use(API_PREFIX,  paymentRoute);

//Listening On PORT
app.listen(PORT, ()=>console.log("Server is Running on PORT : " + PORT))