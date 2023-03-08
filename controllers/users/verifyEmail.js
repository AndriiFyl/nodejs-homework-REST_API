const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
    // виятгуємо токен верифікації юзера з req.params
    const { verificationToken } = req.params;
    // шукаємо, чи є юзер х таким токеном верифікації
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw NotFound;
    }
//    якщо такий юзер є, то підтверджуємо верифікацію та обнуляємо токен
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.json({
        message: "verify success"
    })

    
}

module.exports = verifyEmail;