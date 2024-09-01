const recaptchaRouter = require("express")();
const dotenv = require("dotenv")
dotenv.config();

const recaptchaController = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: "No token provided" });
    }

    const secretKey = process.env.SECRET_KEY;
    
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: secretKey,
                response: token,
            },
        });
        const data = response.data;

        if (data.success && data.score >= 0.5) {
            // CAPTCHA verification succeeded, proceed with form submission
            res.json({ success: true });
        } else {
            // CAPTCHA verification failed
            res.json({ success: false, message: "CAPTCHA verification failed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying CAPTCHA" });
    }
}

recaptchaRouter.route("/submit").post(recaptchaController)

module.exports = recaptchaRouter;