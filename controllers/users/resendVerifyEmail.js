const { NotFound } = require("http-errors");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound("User not found");
  }

  if (user.verify) {
    throw new Error("Verification has already been passed");
  }
  const verificationToken = user.verificationToken;
  const msg = {
    to: email,
    subject: "Confirm you email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm you email</a>`,
  };
  await sendEmail(msg);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};
module.exports = resendVerifyEmail;
