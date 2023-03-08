const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");


const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
         throw NotFound;
    }

    if (user.verify) {
        throw BadRequest("User already vetify");
    };

     const mail = {
        to: email,
        subject: "Approve email",
        html: `<a target="_blank" hreaf="http://localhost:3000/api/users/verify/${user.verificationToken}">Approve email</a>`
    };
    await sendEmail(mail);
    res.json({
        message: "Email verify resend"
    })

}

module.exports = resendVerifyEmail;