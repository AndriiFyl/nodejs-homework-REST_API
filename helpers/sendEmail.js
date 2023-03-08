const sgMail = require("@sendgrid/mail");
require("dotenv").config();


const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// функція, щл отримує об'єкт з інфою: кому відправити листа, від кого, та сам лист
const sendEmail = async (data) => {
    const email = { ...data, from: "fil.andrey91@gmail.com" };

    try {

        await sgMail.send(email);
        return true;
    }

     catch (error) {
        throw error;
    }

};

module.exports = sendEmail;



