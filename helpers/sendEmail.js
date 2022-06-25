const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "alena.senkiv@gmail.com" };
  try {
    await sgMail.send(email);
    console.log("The letter has been sent");
    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = sendEmail;
