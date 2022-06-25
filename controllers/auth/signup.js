const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const verificationToken = uuidv4();
  const avatarUrl = gravatar.url(email);
  const newUser = new User({ email, avatarUrl, verificationToken });
  newUser.setPassword(password);

  await newUser.save();

  const msg = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Please, verify you email</a>`,
  };

  await sendEmail(msg);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarUrl,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
